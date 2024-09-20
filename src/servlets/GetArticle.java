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
 * Servlet implementation class GetArticle
 */
@WebServlet("/GetArticle")
public class GetArticle extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetArticle() {
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
		response.setContentType("application/json");
		HttpSession session = request.getSession();
		String posts_id  = request.getParameter("posts_id");
		
		PrintWriter out = response.getWriter();
		if (!session.isNew()) {
			Database db = new Database();
			Object[][] res = db.executeQuery("SELECT *FROM posts WHERE posts_id = ? ORDER BY posts_created_at DESC;", Integer.parseInt(posts_id));
			Object[][] res2 = db.executeQuery("SELECT comments.comments_id, comments.posts_id, comments.id_users, comments.comments_descripcion, comments.comments_created_at, comments.comments_main, comments.comments_refer_id FROM comments INNER JOIN posts ON comments.posts_id = posts.posts_id WHERE comments.posts_id = ? ORDER BY comments.comments_created_at ASC;", Integer.parseInt(posts_id));
			Json json = new Json();
			json.add("status", 200);
			json.add("message", "Success");
			json.add("data", json.getDataReplaceBackslash(res));
			json.add("comments", json.getDataReplaceBackslash(res2));
			response.setStatus(200);
			out.print(json);
			out.flush();
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}