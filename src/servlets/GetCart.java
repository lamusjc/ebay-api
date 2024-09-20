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
 * Servlet implementation class GetCart
 */
@WebServlet("/GetCart")
public class GetCart extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetCart() {
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
		String id_users = (String) session.getAttribute("user");
		
		PrintWriter out = response.getWriter();
		if (!session.isNew()) {
			Database db = new Database();
			Object[][] res = db.executeQuery("SELECT cart.posts_id, posts.id_users, cart.cart_quantity, posts_title, posts_description, posts_price, posts_created_at, posts_quantity, posts_image FROM cart INNER JOIN posts ON cart.posts_id = posts.posts_id WHERE cart.id_users = ?", Integer.parseInt(id_users));
			Json json = new Json();
			json.add("status", 200);
			json.add("message", "Success");
			json.add("data", json.getDataReplaceBackslash(res));
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