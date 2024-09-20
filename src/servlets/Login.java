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
import helpers.Hash;
import helpers.Json;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Login() {
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
		response.getWriter().append("Served at: Login").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("username");
		String password = request.getParameter("password");

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		Database db = new Database();
		Object[][] res = db.executeQuery("SELECT * FROM users WHERE id_users = ? AND password = ?",
				Integer.parseInt(username), Hash.getHashMD5(password));

		if (res.length - 1 > 0) {
			HttpSession session = request.getSession();
			session.setAttribute("user", username);
			if (session.isNew()) {
				Json json = new Json();
				json.add("status", 200);
				json.add("message", "Logeado con exito");
				response.setStatus(200);
				out.print(json);
				out.flush();
			} else {
				Json json = new Json();
				json.add("status", 401);
				json.add("message", "Sesion existe");
				response.setStatus(401);
				out.print(json);
				out.flush();
			}
		} else {
			Json json = new Json();
			json.add("status", 404);
			json.add("message", "Datos incorrectos");
			response.setStatus(404);
			out.print(json);
			out.flush();
		}
	}

}
