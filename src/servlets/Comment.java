package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import helpers.Database;
import helpers.Json;

/**
 * Servlet implementation class EditArticle
 */
@WebServlet("/Comment")
public class Comment extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Comment() {
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
		String id_users = (String) session.getAttribute("user");
		String posts_id  = request.getParameter("posts_id");
		String comments_descripcion = request.getParameter("comments_descripcion");
		String comments_main = request.getParameter("comments_main");
		String comments_refer_id = request.getParameter("comments_refer_id");

		PrintWriter out = response.getWriter();
		if (!session.isNew()) {
			Database db = new Database();
			Object[][] time = db.executeQuery("SELECT *FROM now();");
			boolean ex = db.execute("INSERT INTO comments(posts_id, id_users, comments_descripcion, comments_created_at, comments_main, comments_refer_id) VALUES(?,?,?,?,?,?)", Integer.parseInt(posts_id), Integer.parseInt(id_users), comments_descripcion, time[1][0], Boolean.parseBoolean(comments_main), comments_refer_id);
			if(ex){
				Json json = new Json();
				json.add("status", 200);
				json.add("message", "Comentario agregado");
				response.setStatus(200);
				out.print(json);
				out.flush();
			}else{
				Json json = new Json();
				json.add("status", 500);
				json.add("message", "Error interno del servidor");
				response.setStatus(200);
				out.print(json);
				out.flush();
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