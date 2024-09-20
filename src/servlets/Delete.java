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
 * Servlet implementation class Delete
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Delete() {
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
		PrintWriter out = response.getWriter();
		String user = (String) session.getAttribute("user");
		
		if (!session.isNew()) {
			Database db = new Database();
			boolean res = db.execute("DELETE FROM cart WHERE id_users = ?", Integer.parseInt(user));
			boolean res2 = db.execute("DELETE FROM comments WHERE id_users = ?", Integer.parseInt(user));
			boolean res3 = db.execute("DELETE FROM posts WHERE id_users = ?", Integer.parseInt(user));
			boolean res4 = db.execute("DELETE FROM users WHERE id_users = ?", Integer.parseInt(user));
			if (res && res2 && res3 && res4) {
				session.invalidate();
				Json json = new Json();
				json.add("status", 200);
				json.add("message", "Borrado con exito");
				response.setStatus(200);
				out.print(json);
				out.flush();
			} else {
				Json json = new Json();
				json.add("status", 500);
				json.add("message", "Error al eliminar");
				response.setStatus(500);
				out.print(json);
				out.flush();
			}
		}else {
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
