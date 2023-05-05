from flask import Flask, request, jsonify, render_template
import json
from datetime import datetime

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    with open("expense.json", "r") as f:
        existing_expense = json.load(f)
    with open("category.json", "r") as f:
        existing_category = json.load(f)    
    with open("budget.json", "r") as f:
        existing_budget = json.load(f)

    # Initialize the variables with default values
    descr = ''
    amount = 0
    category = ''
    name = ''

    # Append the new data to the existing data
    if request.method == 'POST':
        if 'descr' in request.form and 'amount' in request.form and 'category' in request.form:
            descr = request.form['descr']
            amount = request.form['amount']
            category = request.form['category']
            new_expense = {
                "descr": descr,
                "amount": amount,
                "category": category
            }
            existing_expense.append(new_expense)
        elif 'name' in request.form and 'amount' in request.form and 'category' in request.form:
            name = request.form['name']
            amount = request.form['amount']
            category = request.form['category']
            new_budget = {
                'name': name,
                'amount': amount,
                'category': category
            }
            existing_budget.append(new_budget)
        elif 'category' in request.form:
            category = request.form['category']
            new_category = {
                'category': category
            }
            existing_category.append(new_category)


    # Write the entire data object back to the file
    with open("expense.json", "w") as f:
        json.dump(existing_expense, f)
    with open("category.json", "w") as f:
        json.dump(existing_category, f)
    with open("budget.json", "w") as f:
        json.dump(existing_budget, f)
    expenses = existing_expense
    categories = existing_category
    budgets = existing_budget

    return render_template('index.html', expenses=expenses, categories=categories, budgets=budgets)


@app.route('/categories', methods=['GET', 'POST'])
def categories():
    with open("category.json", "r") as file:
        category_list = json.load(file)
    categories = category_list
    total_budget_list = category_list

    with open("budget.json", "r") as file:
        budget_list = json.load(file)

    for category in total_budget_list:
        category["total budget"] = 0
        for budget in budget_list:
            if budget["category"] == category["category"]:
                category["total budget"] += int(budget["amount"])
    
    current_date = datetime.now()
    return render_template("categories.html", categories=categories, budgets=total_budget_list, current_date=current_date)


if __name__ == '__main__':
    app.run(debug=True)