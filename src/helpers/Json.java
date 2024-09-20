package helpers;

import java.util.*;

public class Json {

    private String body = "";

    public Json add(String name, Number value) {

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + value;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + value;
        }
        return this;
    }

    public Json add(String name, int... values) {

        List<Integer> _values = new ArrayList<Integer>();

        for (int value : values) {
            _values.add(value);
        }

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + _values;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + _values;
        }
        return this;
    }

    public Json add(String name, double... values) {

        List<Double> _values = new ArrayList<Double>();

        for (double value : values) {
            _values.add(value);
        }

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + _values;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + _values;
        }
        return this;
    }

    public Json add(String name, String... values) {

        for (int i = 0; i < values.length; i++) {
            values[i] = this.getWithQuotes(values[i]);
        }

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + Arrays.asList(values);
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + Arrays.asList(values);
        }
        return this;
    }

    public Json add(String name, Json Json) {

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + Json;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + Json;
        }
        return this;
    }

    public Json add(String name, Json... Jsons) {

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + Arrays.asList(Jsons);
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + Arrays.asList(Jsons);
        }
        return this;
    }

    public Json add(String name, String value) {

        this.body = this.body.equals("") ? this.getWithQuotes(name).concat(":".concat(this.getWithQuotes(value))) :

                this.body.concat(",".concat(this.getWithQuotes(name).concat(":".concat(this.getWithQuotes(value)))));

        return this;
    }

    public Json add(String name, String[][] table) {

        Json Json = new Json();
        ArrayList<String> Jsons = new ArrayList<String>();

        String[] fields = table[0];

        for (int i = 1; i < table.length; i++) {
            for (int j = 0; j < fields.length; j++) {
                Json.add(fields[j], table[i][j]);
            }
            Jsons.add(Json.getJson());
            Json.clear();
        }

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + Jsons;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + Jsons;
        }

        return this;
    }

    public Json add(String name, String[] fields, String[][] table) {
        Json Json = new Json();
        ArrayList<String> Jsons = new ArrayList<String>();

        for (int i = 0; i < table.length; i++) {
            for (int j = 0; j < fields.length; j++) {
                Json.add(fields[j], table[i][j]);
            }
            Jsons.add(Json.getJson());
            Json.clear();
        }

        if (this.body.equals("")) {
            this.body = this.getWithQuotes(name) + ":" + Jsons;
        } else {
            this.body += "," + this.getWithQuotes(name) + ":" + Jsons;
        }

        return this;
    }

    public Json getData(Object[][] table) {
        Json jsonAux = new Json();
        Json jsonFinal = new Json();
        for (int i = 0; i < table.length; i++) {
            for (int j = 0; j < table[i].length; j++) {
                if (i > 0) {
                    jsonAux.add(table[0][j].toString(), table[i][j].toString());
                    jsonFinal.add(i - 1 + "", jsonAux);
                }
            }
        }
        return jsonFinal;
    }
    
    public Json getDataReplaceBackslash(Object[][] table) {
        Json jsonAux = new Json();
        Json jsonFinal = new Json();
        for (int i = 0; i < table.length; i++) {
            for (int j = 0; j < table[i].length; j++) {
                if (i > 0) {
                    jsonAux.add(table[0][j].toString(), table[i][j].toString().replace("\\", "\\\\"));
                    jsonFinal.add(i - 1 + "", jsonAux);
                }
            }
        }
        return jsonFinal;
    }

    private String getWithQuotes(String txt) {
        return "\"".concat(txt.concat("\""));
    }

    public Json clear() {
        this.body = "";
        return this;
    }

    public String getJson() {
        return "{".concat(this.body.concat("}"));
    }

    public String toString() {
        return this.getJson();
    }

}