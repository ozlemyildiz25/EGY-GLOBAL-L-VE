const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

let users = [];
let verifications = [];
let subscriptions = [];
let dailyStats = {};

const validCertificates = {
    'ISO-9001-2024-TR-001': {
        company: 'ABC Teknoloji A.Ş.',
        type: 'ISO 9001:2015',
        issueDate: '2024-01-15',
        expiryDate: '2027-01-15',
        issuer: 'TSE',
        status: 'active'
    },
    'ISO-27001-2024-TR-002': {
        company: 'XYZ Yazılım Ltd.',
        type: 'ISO 27001:2013
