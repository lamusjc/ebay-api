package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;

import helpers.Database;
import helpers.Json;

/**
 * Servlet implementation class Post
 */
@MultipartConfig()
@WebServlet("/Post")
public class Post extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Post() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();
		if (!session.isNew()) {
			Part file = request.getPart("file");
			InputStream filecontent = file.getInputStream();

			String id_users = (String) session.getAttribute("user");
			String posts_title = request.getParameter("posts_title");
			String posts_description = request.getParameter("posts_description");
			String posts_price = request.getParameter("posts_price");
			String posts_quantity = request.getParameter("posts_quantity");
			String url = session.getServletContext().getRealPath("WebContent\\Media\\" + session.getAttribute("user"));
			String fileName = this.getFileName(file);
			OutputStream os = null;
			try {
				File createFile = new File(url);
				if (!createFile.exists()) {
					if (createFile.mkdir()) {
						System.out.println("Directorio creado");
						os = new FileOutputStream(url + "\\" + fileName);
						int read = 0;
						byte[] bytes = new byte[1024];
						while ((read = filecontent.read(bytes)) != -1) {
							os.write(bytes, 0, read);
						}
					} else {
						System.out.println("Error al crear el directorio");
					}
				} else {
					os = new FileOutputStream(url + "\\" + fileName);
					int read = 0;
					byte[] bytes = new byte[1024];
					while ((read = filecontent.read(bytes)) != -1) {
						os.write(bytes, 0, read);
					}
					System.out.println("Ese directorio ya existe");
				}

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (filecontent != null) {
					filecontent.close();
				}
				if (os != null) {
					os.close();
				}
				String urlDefinitive = url + "\\" + fileName;
				Database db = new Database();
				Object[][] time = db.executeQuery("SELECT *FROM now();");
				boolean ex = db.execute(
						"INSERT INTO posts(id_users, posts_title, posts_description, posts_price, posts_created_at, posts_quantity, posts_image) VALUES(?, ?, ?, ?, ?, ?, ?)",
						Integer.parseInt(id_users), posts_title, posts_description, Double.valueOf(posts_price),
						time[1][0], Integer.parseInt(posts_quantity), urlDefinitive);

				if (ex) {
					Json json = new Json();
					json.add("status", 200);
					json.add("message", "Articulo ingresado con exito");
					response.setStatus(200);
					out.print(json);
					out.flush();
				} else {
					Json json = new Json();
					json.add("status", 500);
					json.add("message", "Error interno del servidor");
					response.setStatus(500);
					out.print(json);
					out.flush();
				}
			}
		} else {
			session.invalidate();
			Json json = new Json();
			json.add("status", 401);
			json.add("message", "Debes logear primero");
			response.setStatus(401);
			out.print(json);
			out.flush();
		}

	}

	// Esta funcion permite obtener el nombre del archivo
	private String getFileName(Part part) {
		for (String content : part.getHeader("content-disposition").split(";")) {
			if (content.trim().startsWith("filename")) {
				return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
			}
		}
		return null;
	}

}