package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import helpers.Database;
import helpers.Hash;
import helpers.Json;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Register() {
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

		String id_users = request.getParameter("id_users");
		String id_roles = request.getParameter("id_roles");
		String name = request.getParameter("name");
		String lastname = request.getParameter("lastname");
		String username = request.getParameter("username");
		String phone = request.getParameter("phone");
		String password = request.getParameter("password");

		Database db = new Database();
		boolean ex = db.execute("INSERT INTO users VALUES(?,?,?,?,?,?,?)", Integer.parseInt(id_users),
				Integer.parseInt(id_roles), name, lastname, username, phone, Hash.getHashMD5(password));

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		if (ex) {
			Json json = new Json();
			json.add("status", 200);
			json.add("message", "Registrado con exito");
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
