import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Form,
  Button,
  FormControl,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API_CONFIG from '../../../config';

const ExpenseIndex = () => {
  const [expenses, setExpenses] = useState([]);
  const [identifier, setIdentifier] = useState('');
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(''); // State for error message

  const isAtLeastOneFieldFilled = () => {
    return (
      identifier.trim() !== '' || category.trim() !== '' || startDate || endDate
    );
  };

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/expense_categories`)
      .then((response) => {
        const [categories] = response.data;
        setExpenseCategories(categories || []);
      })
      .catch((error) => {
        console.error('Error fetching expense categories:', error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      if (!isAtLeastOneFieldFilled()) {
        setError('لابد من اختيار عنصر واحد على الأقل للبحث.'); // Set the error message
        setTimeout(() => {
          setError(''); // Clear the error message after 6 seconds
        }, 6000); // 6 seconds (6000 milliseconds)
        return;
      }

      const searchCriteria = {
        identifier,
        category,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      };

      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/expenses/search`,
        { params: searchCriteria },
      );
      setExpenses(response.data.filtered_expenses || []);
      setError(''); // Clear the error message
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Card>
      <Card.Header className="expenses-card-header">
        <Row>
          <Col xs={12} md={6} lg={3} className="text-center text-md">
            <FormControl
              type="search"
              placeholder="إبحث برقم ملف القضية أو الخدمة"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center text-md">
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">اختر نوع المصروف</option>
              {expenseCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center text-md p-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="بدأ من تاريخ"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center text-md p-4">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="حتى تاريخ"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </Col>
          <Col xs={12} md={12} lg={12} className="text-center text-md p-4">
            <Button onClick={handleSearch}>
              <BiSearchAlt /> بحث
            </Button>
          </Col>
        </Row>
      </Card.Header>
      {error && (
        <Row>
          <Col xs={12} md={12} lg={12} className="text-center text-md">
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
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
              {expenses.map((expense) => {
                const amountObj = JSON.parse(expense.amount || '{}');
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
  );
};

export default ExpenseIndex;
