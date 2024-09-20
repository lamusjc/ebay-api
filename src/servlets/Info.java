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
 * Servlet implementation class Info
 */
@WebServlet("/Info")
public class Info extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Info() {
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
		if (!session.isNew()) {
			String user = (String) session.getAttribute("user");

			Database db = new Database();
			Object[][] res = db.executeQuery("select name, lastname, username, phone from users WHERE id_users = ?",
					Integer.parseInt(user));
			Object[][] res2 = db.executeQuery("select *from cart WHERE id_users = ?",
					Integer.parseInt(user));

			Json json = new Json();
			json.add("status", 200);
			json.add("id_users", user);
			json.add("message", "Bienvenido " + user + "");
			json.add("cart_quantity", res2.length - 1);
			json.add("data", json.getData(res));
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
