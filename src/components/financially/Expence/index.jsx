import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for DatePicker

// API configuration
import API_CONFIG from '../../../config';

const ExpenseIndex = () => {
  const [expenses, setExpenses] = useState([]);
  const [identifier, setIdentifier] = useState('');
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [setCategory] = useState('');
  const [startDate, setStartDate] = useState(null); // Date range filter
  const [endDate, setEndDate] = useState(null); // Date range filter
  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/expense_categories`)
      .then(response => {
        // Your data seems to be an array within an array. Destructuring it here.
        const [categories] = response.data;
        setExpenseCategories(categories || []);
      })
      .catch(error => {
        console.error('Error fetching expense categories:', error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      // Use the multi-criteria search parameters here in your API call
      // ...

      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/expenses/${identifier}`,
      );
      setExpenses(response.data.expenses_by_leg_case || []);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      {' '}
      <div className="financial-search-card">
        <p>بحث الإيرادات</p>
      </div>
      <Card>
        <Card.Header className="expenses-card-header">
          <Row>
            <Col xs={12} md={6} lg={6} className="text-center text-md">
              <FormControl
                type="text"
                placeholder="إبحث برقم ملف القضية أو الخدمة"
                onChange={e => setIdentifier(e.target.value)}
              />
            </Col>
            <Col xs={12} md={6} lg={6} className="text-center text-md">
              <Form.Select onChange={e => setCategory(e.target.value)}>
                <option>اختر نوع المصروف</option>
                {expenseCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6} className="text-center text-md p-4">
              {/* Added DatePicker for date range filter */}
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="بدأ من تاريخ"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </Col>

            <Col xs={12} md={6} lg={6} className="text-center text-md p-4">
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText="حتى تاريخ"
                dateFormat="yyyy-MM-dd"
                isClearable
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12} className="text-center text-md p-4">
              <Button onClick={handleSearch}>
                <BiSearchAlt /> بحث
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th className="col-1">م</th>

                  <th className="col-2">رقم ملف الخدمة أو القضية</th>
                  <th className="col-2">نوع المصروف</th>
                  <th className="col-3">التفاصيل</th>
                  <th className="col-2">ملاحظة</th>
                  <th className="col-3">تاريخ المصروف</th>
                  <th className="col-1">الرسوم</th>
                  <th className="col-1">تكاليف اخرى</th>
                  <th className="col-2">أنشئ بواسطة</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => {
                  const amountObj = JSON.parse(expense.amount || '{}'); // Parse JSON, provide empty object as fallback
                  return (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>

                      <td>
                        {expense.service_id
                          ? expense.service.service_no
                          : expense.leg_case_id
                          ? expense.leg_case.slug
                          : ''}
                      </td>

                      <td>{expense.expense_category?.name}</td>
                      <td>{expense.description}</td>
                      <td>{expense.note}</td>
                      <td>{expense.expense_date}</td>
                      <td>{amountObj.cost}</td>
                      <td>{amountObj.cost2}</td>
                      <td>{expense.user?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExpenseIndex;
