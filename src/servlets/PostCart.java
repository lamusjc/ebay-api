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
import helpers.Hash;
import helpers.Json;

/**
 * Servlet implementation class PostCart
 */
@MultipartConfig()
@WebServlet("/PostCart")
public class PostCart extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PostCart() {
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
		response.setContentType("application/json");
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();

		if (!session.isNew()) {
			String id_users = (String) session.getAttribute("user");
			String posts_id = request.getParameter("posts_id");
			String cart_quantity = request.getParameter("cart_quantity");
			Database db = new Database();
			Object[][] res = db.executeQuery("SELECT *FROM posts WHERE id_users = ? AND posts_id = ?",
					Integer.parseInt(id_users), Integer.parseInt(posts_id));
			if (res.length - 1 > 0) {
				Json json = new Json();
				json.add("status", 409);
				json.add("message", "No puedes agregar tu propio producto al carrito de compras");
				response.setStatus(409);
				out.print(json);
				out.flush();
			} else {
				Object[][] res2 = db.executeQuery("SELECT *FROM cart WHERE id_users = ? AND posts_id = ?",
						Integer.parseInt(id_users), Integer.parseInt(posts_id));
				if (res2.length - 1 > 0) {
					Json json = new Json();
					json.add("status", 409);
					json.add("message", "Ese producto ya existe en tu carrito de compras");
					response.setStatus(409);
					out.print(json);
					out.flush();
				} else {
					boolean ex = db.execute("INSERT INTO cart(id_users, posts_id, cart_quantity) VALUES(?, ?, ?)",
							Integer.parseInt(id_users), Integer.parseInt(posts_id), Integer.parseInt(cart_quantity));
					if (ex) {
						Json json = new Json();
						json.add("status", 200);
						json.add("message", "Agregado al carrito con exito");
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

}