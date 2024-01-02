import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';
import API_CONFIG from '../config';

const CourtSearcj = () => {

  return (
    <Card>
      <Card.Header className="home-text-center">لوحة التحكم</Card.Header>
      <Card.Body>
        <Card.Title className="home-text-center">Upload Files</Card.Title>
        <Card.Text className="home-text-center">
          Please select a file to upload
        </Card.Text>

        <div className="mb-4 text-center">
         
         
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourtSearcj;
