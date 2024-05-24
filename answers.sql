SELECT email FROM customers ORDER BY email;

SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE fname = 'Elizabeth'
AND lname = 'Crocker');

SELECT SUM(num_cupcakes) FROM orders WHERE processed = FALSE;

SELECT name, (SELECT SUM(num_cupcakes) FROM orders 
WHERE cupcakes.id = orders.cupcake_id) FROM cupcakes ORDER BY name;

SELECT email, (SELECT SUM(num_cupcakes) FROM orders WHERE orders.customer_id = customers.id) 
FROM customers ORDER BY 
(SELECT SUM(num_cupcakes) FROM orders WHERE orders.customer_id = customers.id) DESC;

SELECT fname, lname, email FROM customers 
WHERE 'funfetti' IN ((SELECT (SELECT name FROM cupcakes WHERE cupcakes.id = orders.id) 
FROM orders WHERE orders.customer_id = customers.id));