package helpers;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {

	public static String getHashMD5(String value) {
		return Hash.encriptarTexto(value, "MD5");
	}

	private static String encriptarTexto(String text, String security) {
		byte[] digest = null;
		try {
			MessageDigest md = MessageDigest.getInstance(security);
			byte[] buffer = text.getBytes();
			md.update(buffer);
			digest = md.digest();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return Hash.bytesToHex(digest);
	}

	private static String bytesToHex(byte[] bytes) {
		StringBuilder hex = new StringBuilder();
		for (byte aux : bytes) {
			int b = aux & 0xff;
			String hexTemp = Integer.toHexString(b);

			if (hexTemp.length() == 1)
				hex.append("0");
			hex.append(hexTemp);
		}

		return hex.toString();
	}

}
