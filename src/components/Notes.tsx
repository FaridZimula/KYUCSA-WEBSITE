import React, { useState } from 'react';
import { BookOpen, Download, Search, Filter, FileText } from 'lucide-react';

interface NotesProps {
  setCurrentPage: (page: string) => void;
}

const Notes: React.FC<NotesProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', count: 180 },
    { id: 'bitc', name: 'BITC Notes', count: 45 },
    { id: 'bis', name: 'BIS Notes', count: 45 },
    { id: 'blis', name: 'BLIS Notes', count: 45 },
    { id: 'cs', name: 'Computer Science Notes', count: 45 }
  ];

  const years = [
    { id: 'all', name: 'All Years' },
    { id: 'year1', name: 'Year 1' },
    { id: 'year2', name: 'Year 2' },
    { id: 'year3', name: 'Year 3' }
  ];

  const documents = {
    bitc: {
      year1: [
        { id: 1, name: 'Introduction to Programming - BITC 1101', type: 'PDF', size: '2.5 MB', downloads: 245 },
        { id: 2, name: 'Computer Systems Architecture - BITC 1102', type: 'PDF', size: '3.2 MB', downloads: 189 },
        { id: 3, name: 'Mathematics for Computing - BITC 1103', type: 'PDF', size: '4.1 MB', downloads: 312 },
        { id: 4, name: 'Digital Logic Design - BITC 1104', type: 'PDF', size: '3.8 MB', downloads: 156 },
        { id: 5, name: 'Communication Skills - BITC 1105', type: 'PDF', size: '2.3 MB', downloads: 203 },
        { id: 6, name: 'Computer Applications - BITC 1106', type: 'PDF', size: '3.5 MB', downloads: 167 },
        { id: 7, name: 'Statistics for IT - BITC 1107', type: 'PDF', size: '2.8 MB', downloads: 134 },
        { id: 8, name: 'Physics for Computing - BITC 1108', type: 'PDF', size: '4.2 MB', downloads: 198 },
        { id: 9, name: 'Introduction to Algorithms - BITC 1109', type: 'PDF', size: '3.9 MB', downloads: 221 },
        { id: 10, name: 'Computer Ethics - BITC 1110', type: 'PDF', size: '2.1 MB', downloads: 145 },
        { id: 11, name: 'Web Technologies Basics - BITC 1111', type: 'PDF', size: '3.7 MB', downloads: 187 },
        { id: 12, name: 'Database Concepts - BITC 1112', type: 'PDF', size: '4.0 MB', downloads: 123 },
        { id: 13, name: 'Operating Systems Intro - BITC 1113', type: 'PDF', size: '3.4 MB', downloads: 98 },
        { id: 14, name: 'Network Fundamentals - BITC 1114', type: 'PDF', size: '3.1 MB', downloads: 267 },
        { id: 15, name: 'Programming Lab Manual - BITC 1115', type: 'PDF', size: '5.2 MB', downloads: 289 }
      ],
      year2: [
        { id: 16, name: 'Object-Oriented Programming - BITC 2201', type: 'PDF', size: '4.5 MB', downloads: 234 },
        { id: 17, name: 'Data Structures & Algorithms - BITC 2202', type: 'PDF', size: '5.1 MB', downloads: 298 },
        { id: 18, name: 'Database Management Systems - BITC 2203', type: 'PDF', size: '4.8 MB', downloads: 276 },
        { id: 19, name: 'Computer Networks - BITC 2204', type: 'PDF', size: '4.2 MB', downloads: 156 },
        { id: 20, name: 'Web Development - BITC 2205', type: 'PDF', size: '5.3 MB', downloads: 189 },
        { id: 21, name: 'Software Engineering - BITC 2206', type: 'PDF', size: '4.7 MB', downloads: 223 },
        { id: 22, name: 'System Analysis & Design - BITC 2207', type: 'PDF', size: '4.1 MB', downloads: 167 },
        { id: 23, name: 'Computer Graphics - BITC 2208', type: 'PDF', size: '5.5 MB', downloads: 145 },
        { id: 24, name: 'Mobile App Development - BITC 2209', type: 'PDF', size: '4.9 MB', downloads: 201 },
        { id: 25, name: 'Information Security - BITC 2210', type: 'PDF', size: '3.8 MB', downloads: 134 },
        { id: 26, name: 'Human Computer Interaction - BITC 2211', type: 'PDF', size: '3.6 MB', downloads: 178 },
        { id: 27, name: 'Discrete Mathematics - BITC 2212', type: 'PDF', size: '4.3 MB', downloads: 156 },
        { id: 28, name: 'Computer Organization - BITC 2213', type: 'PDF', size: '4.0 MB', downloads: 123 },
        { id: 29, name: 'Programming Languages - BITC 2214', type: 'PDF', size: '3.9 MB', downloads: 189 },
        { id: 30, name: 'Project Management - BITC 2215', type: 'PDF', size: '3.2 MB', downloads: 245 }
      ],
      year3: [
        { id: 31, name: 'Advanced Programming - BITC 3301', type: 'PDF', size: '5.8 MB', downloads: 267 },
        { id: 32, name: 'Artificial Intelligence - BITC 3302', type: 'PDF', size: '6.2 MB', downloads: 345 },
        { id: 33, name: 'Machine Learning - BITC 3303', type: 'PDF', size: '5.9 MB', downloads: 298 },
        { id: 34, name: 'Cloud Computing - BITC 3304', type: 'PDF', size: '4.8 MB', downloads: 234 },
        { id: 35, name: 'Cybersecurity - BITC 3305', type: 'PDF', size: '5.1 MB', downloads: 276 },
        { id: 36, name: 'Data Mining - BITC 3306', type: 'PDF', size: '4.7 MB', downloads: 189 },
        { id: 37, name: 'Distributed Systems - BITC 3307', type: 'PDF', size: '5.4 MB', downloads: 167 },
        { id: 38, name: 'Advanced Databases - BITC 3308', type: 'PDF', size: '4.9 MB', downloads: 156 },
        { id: 39, name: 'Software Architecture - BITC 3309', type: 'PDF', size: '5.2 MB', downloads: 201 },
        { id: 40, name: 'Internet Technologies - BITC 3310', type: 'PDF', size: '4.6 MB', downloads: 134 },
        { id: 41, name: 'Research Methods - BITC 3311', type: 'PDF', size: '3.8 MB', downloads: 178 },
        { id: 42, name: 'Final Year Project Guide - BITC 3312', type: 'PDF', size: '4.1 MB', downloads: 312 },
        { id: 43, name: 'Industry Attachment - BITC 3313', type: 'PDF', size: '2.9 MB', downloads: 245 },
        { id: 44, name: 'Emerging Technologies - BITC 3314', type: 'PDF', size: '5.0 MB', downloads: 189 },
        { id: 45, name: 'IT Entrepreneurship - BITC 3315', type: 'PDF', size: '3.7 MB', downloads: 156 }
      ]
    },
    bis: {
      year1: [
        { id: 46, name: 'Business Fundamentals - BIS 1101', type: 'PDF', size: '3.1 MB', downloads: 234 },
        { id: 47, name: 'Information Systems Intro - BIS 1102', type: 'PDF', size: '3.8 MB', downloads: 198 },
        { id: 48, name: 'Computer Applications - BIS 1103', type: 'PDF', size: '4.2 MB', downloads: 276 },
        { id: 49, name: 'Mathematics for Business - BIS 1104', type: 'PDF', size: '3.5 MB', downloads: 156 },
        { id: 50, name: 'Communication Skills - BIS 1105', type: 'PDF', size: '2.8 MB', downloads: 189 },
        { id: 51, name: 'Accounting Principles - BIS 1106', type: 'PDF', size: '4.1 MB', downloads: 223 },
        { id: 52, name: 'Statistics for Business - BIS 1107', type: 'PDF', size: '3.7 MB', downloads: 167 },
        { id: 53, name: 'Economics Basics - BIS 1108', type: 'PDF', size: '3.4 MB', downloads: 145 },
        { id: 54, name: 'Business Ethics - BIS 1109', type: 'PDF', size: '2.9 MB', downloads: 201 },
        { id: 55, name: 'Office Applications - BIS 1110', type: 'PDF', size: '3.6 MB', downloads: 134 },
        { id: 56, name: 'Database Basics - BIS 1111', type: 'PDF', size: '4.0 MB', downloads: 178 },
        { id: 57, name: 'Web Design Intro - BIS 1112', type: 'PDF', size: '3.9 MB', downloads: 156 },
        { id: 58, name: 'Business Law - BIS 1113', type: 'PDF', size: '3.3 MB', downloads: 123 },
        { id: 59, name: 'Management Principles - BIS 1114', type: 'PDF', size: '3.8 MB', downloads: 189 },
        { id: 60, name: 'Research Methods Intro - BIS 1115', type: 'PDF', size: '3.2 MB', downloads: 245 }
      ],
      year2: [
        { id: 61, name: 'Systems Analysis & Design - BIS 2201', type: 'PDF', size: '5.4 MB', downloads: 298 },
        { id: 62, name: 'Database Management - BIS 2202', type: 'PDF', size: '4.8 MB', downloads: 267 },
        { id: 63, name: 'Business Process Management - BIS 2203', type: 'PDF', size: '4.2 MB', downloads: 234 },
        { id: 64, name: 'E-Commerce Systems - BIS 2204', type: 'PDF', size: '4.6 MB', downloads: 189 },
        { id: 65, name: 'Management Information Systems - BIS 2205', type: 'PDF', size: '5.1 MB', downloads: 276 },
        { id: 66, name: 'Enterprise Resource Planning - BIS 2206', type: 'PDF', size: '4.9 MB', downloads: 156 },
        { id: 67, name: 'Decision Support Systems - BIS 2207', type: 'PDF', size: '4.3 MB', downloads: 223 },
        { id: 68, name: 'Knowledge Management - BIS 2208', type: 'PDF', size: '4.1 MB', downloads: 167 },
        { id: 69, name: 'Business Intelligence - BIS 2209', type: 'PDF', size: '5.2 MB', downloads: 145 },
        { id: 70, name: 'IT Project Management - BIS 2210', type: 'PDF', size: '4.7 MB', downloads: 201 },
        { id: 71, name: 'Supply Chain Management - BIS 2211', type: 'PDF', size: '4.0 MB', downloads: 134 },
        { id: 72, name: 'Customer Relationship Management - BIS 2212', type: 'PDF', size: '3.8 MB', downloads: 178 },
        { id: 73, name: 'Financial Information Systems - BIS 2213', type: 'PDF', size: '4.4 MB', downloads: 156 },
        { id: 74, name: 'Human Resource Information Systems - BIS 2214', type: 'PDF', size: '4.1 MB', downloads: 123 },
        { id: 75, name: 'Operations Management - BIS 2215', type: 'PDF', size: '3.9 MB', downloads: 189 }
      ],
      year3: [
        { id: 76, name: 'Strategic Information Systems - BIS 3301', type: 'PDF', size: '5.7 MB', downloads: 312 },
        { id: 77, name: 'Digital Transformation - BIS 3302', type: 'PDF', size: '5.1 MB', downloads: 245 },
        { id: 78, name: 'IT Governance - BIS 3303', type: 'PDF', size: '4.8 MB', downloads: 189 },
        { id: 79, name: 'Business Analytics - BIS 3304', type: 'PDF', size: '5.4 MB', downloads: 276 },
        { id: 80, name: 'IT Audit & Control - BIS 3305', type: 'PDF', size: '4.6 MB', downloads: 156 },
        { id: 81, name: 'Enterprise Architecture - BIS 3306', type: 'PDF', size: '5.0 MB', downloads: 234 },
        { id: 82, name: 'Information Security Management - BIS 3307', type: 'PDF', size: '4.9 MB', downloads: 167 },
        { id: 83, name: 'Cloud Business Solutions - BIS 3308', type: 'PDF', size: '4.7 MB', downloads: 223 },
        { id: 84, name: 'Mobile Business Applications - BIS 3309', type: 'PDF', size: '4.3 MB', downloads: 145 },
        { id: 85, name: 'Big Data Analytics - BIS 3310', type: 'PDF', size: '5.8 MB', downloads: 298 },
        { id: 86, name: 'Innovation Management - BIS 3311', type: 'PDF', size: '4.2 MB', downloads: 201 },
        { id: 87, name: 'Capstone Project - BIS 3312', type: 'PDF', size: '3.6 MB', downloads: 267 },
        { id: 88, name: 'Industry Attachment - BIS 3313', type: 'PDF', size: '2.8 MB', downloads: 134 },
        { id: 89, name: 'Business Consulting - BIS 3314', type: 'PDF', size: '4.1 MB', downloads: 178 },
        { id: 90, name: 'Entrepreneurship in IT - BIS 3315', type: 'PDF', size: '3.9 MB', downloads: 156 }
      ]
    },
    blis: {
      year1: [
        { id: 91, name: 'Library Science Fundamentals - BLIS 1101', type: 'PDF', size: '2.9 MB', downloads: 167 },
        { id: 92, name: 'Information Organization - BLIS 1102', type: 'PDF', size: '3.4 MB', downloads: 145 },
        { id: 93, name: 'Cataloguing & Classification - BLIS 1103', type: 'PDF', size: '4.1 MB', downloads: 198 },
        { id: 94, name: 'Reference Services - BLIS 1104', type: 'PDF', size: '3.7 MB', downloads: 176 },
        { id: 95, name: 'Information Literacy - BLIS 1105', type: 'PDF', size: '3.2 MB', downloads: 156 },
        { id: 96, name: 'Computer Applications for Libraries - BLIS 1106', type: 'PDF', size: '3.8 MB', downloads: 189 },
        { id: 97, name: 'Communication Skills - BLIS 1107', type: 'PDF', size: '2.6 MB', downloads: 134 },
        { id: 98, name: 'Research Methods - BLIS 1108', type: 'PDF', size: '3.5 MB', downloads: 167 },
        { id: 99, name: 'Library Management - BLIS 1109', type: 'PDF', size: '3.9 MB', downloads: 145 },
        { id: 100, name: 'Information Sources - BLIS 1110', type: 'PDF', size: '4.0 MB', downloads: 123 },
        { id: 101, name: 'Database Basics for Libraries - BLIS 1111', type: 'PDF', size: '3.6 MB', downloads: 178 },
        { id: 102, name: 'Web Resources - BLIS 1112', type: 'PDF', size: '3.3 MB', downloads: 156 },
        { id: 103, name: 'Library Ethics - BLIS 1113', type: 'PDF', size: '2.8 MB', downloads: 189 },
        { id: 104, name: 'Collection Development - BLIS 1114', type: 'PDF', size: '3.7 MB', downloads: 167 },
        { id: 105, name: 'User Studies - BLIS 1115', type: 'PDF', size: '3.4 MB', downloads: 234 }
      ],
      year2: [
        { id: 106, name: 'Digital Libraries - BLIS 2201', type: 'PDF', size: '4.8 MB', downloads: 298 },
        { id: 107, name: 'Information Retrieval Systems - BLIS 2202', type: 'PDF', size: '4.2 MB', downloads: 267 },
        { id: 108, name: 'Database Management for Libraries - BLIS 2203', type: 'PDF', size: '4.5 MB', downloads: 234 },
        { id: 109, name: 'Web Technologies for Libraries - BLIS 2204', type: 'PDF', size: '4.1 MB', downloads: 189 },
        { id: 110, name: 'Information Systems Design - BLIS 2205', type: 'PDF', size: '4.7 MB', downloads: 276 },
        { id: 111, name: 'Knowledge Organization - BLIS 2206', type: 'PDF', size: '4.3 MB', downloads: 156 },
        { id: 112, name: 'Information Architecture - BLIS 2207', type: 'PDF', size: '4.0 MB', downloads: 223 },
        { id: 113, name: 'Digital Preservation - BLIS 2208', type: 'PDF', size: '3.8 MB', downloads: 167 },
        { id: 114, name: 'Metadata Standards - BLIS 2209', type: 'PDF', size: '3.9 MB', downloads: 145 },
        { id: 115, name: 'Library Automation - BLIS 2210', type: 'PDF', size: '4.4 MB', downloads: 201 },
        { id: 116, name: 'Information Networks - BLIS 2211', type: 'PDF', size: '4.1 MB', downloads: 134 },
        { id: 117, name: 'Electronic Resources Management - BLIS 2212', type: 'PDF', size: '3.7 MB', downloads: 178 },
        { id: 118, name: 'Library Marketing - BLIS 2213', type: 'PDF', size: '3.5 MB', downloads: 156 },
        { id: 119, name: 'Information Policy - BLIS 2214', type: 'PDF', size: '3.6 MB', downloads: 123 },
        { id: 120, name: 'Special Libraries - BLIS 2215', type: 'PDF', size: '3.8 MB', downloads: 189 }
      ],
      year3: [
        { id: 121, name: 'Advanced Information Systems - BLIS 3301', type: 'PDF', size: '5.1 MB', downloads: 312 },
        { id: 122, name: 'Research Methods in LIS - BLIS 3302', type: 'PDF', size: '4.6 MB', downloads: 245 },
        { id: 123, name: 'Information Policy & Ethics - BLIS 3303', type: 'PDF', size: '4.2 MB', downloads: 189 },
        { id: 124, name: 'Library Management Systems - BLIS 3304', type: 'PDF', size: '4.8 MB', downloads: 276 },
        { id: 125, name: 'Digital Humanities - BLIS 3305', type: 'PDF', size: '4.5 MB', downloads: 156 },
        { id: 126, name: 'Information Visualization - BLIS 3306', type: 'PDF', size: '4.9 MB', downloads: 234 },
        { id: 127, name: 'Semantic Web Technologies - BLIS 3307', type: 'PDF', size: '4.7 MB', downloads: 167 },
        { id: 128, name: 'Open Access & Repositories - BLIS 3308', type: 'PDF', size: '4.3 MB', downloads: 223 },
        { id: 129, name: 'Information Security in Libraries - BLIS 3309', type: 'PDF', size: '4.1 MB', downloads: 145 },
        { id: 130, name: 'Mobile Information Services - BLIS 3310', type: 'PDF', size: '4.4 MB', downloads: 298 },
        { id: 131, name: 'Data Analytics for Libraries - BLIS 3311', type: 'PDF', size: '5.0 MB', downloads: 201 },
        { id: 132, name: 'Dissertation Guidelines - BLIS 3312', type: 'PDF', size: '3.3 MB', downloads: 267 },
        { id: 133, name: 'Professional Practice - BLIS 3313', type: 'PDF', size: '3.1 MB', downloads: 134 },
        { id: 134, name: 'Library Innovation - BLIS 3314', type: 'PDF', size: '4.0 MB', downloads: 178 },
        { id: 135, name: 'Future of Libraries - BLIS 3315', type: 'PDF', size: '3.8 MB', downloads: 156 }
      ]
    },
    cs: {
      year1: [
        { id: 136, name: 'Discrete Mathematics - CS 1101', type: 'PDF', size: '4.2 MB', downloads: 289 },
        { id: 137, name: 'Programming Fundamentals - CS 1102', type: 'PDF', size: '3.8 MB', downloads: 267 },
        { id: 138, name: 'Computer Organization - CS 1103', type: 'PDF', size: '4.5 MB', downloads: 234 },
        { id: 139, name: 'Calculus I - CS 1104', type: 'PDF', size: '4.1 MB', downloads: 198 },
        { id: 140, name: 'Physics for Computer Science - CS 1105', type: 'PDF', size: '4.3 MB', downloads: 176 },
        { id: 141, name: 'Introduction to Algorithms - CS 1106', type: 'PDF', size: '4.7 MB', downloads: 312 },
        { id: 142, name: 'Computer Ethics - CS 1107', type: 'PDF', size: '2.9 MB', downloads: 156 },
        { id: 143, name: 'Linear Algebra - CS 1108', type: 'PDF', size: '4.0 MB', downloads: 189 },
        { id: 144, name: 'Programming Lab - CS 1109', type: 'PDF', size: '5.2 MB', downloads: 223 },
        { id: 145, name: 'Computer Systems - CS 1110', type: 'PDF', size: '4.4 MB', downloads: 167 },
        { id: 146, name: 'Logic Design - CS 1111', type: 'PDF', size: '3.9 MB', downloads: 145 },
        { id: 147, name: 'Statistics - CS 1112', type: 'PDF', size: '3.6 MB', downloads: 201 },
        { id: 148, name: 'Technical Writing - CS 1113', type: 'PDF', size: '3.2 MB', downloads: 134 },
        { id: 149, name: 'Computer Applications - CS 1114', type: 'PDF', size: '3.7 MB', downloads: 178 },
        { id: 150, name: 'Problem Solving - CS 1115', type: 'PDF', size: '3.5 MB', downloads: 156 }
      ],
      year2: [
        { id: 151, name: 'Data Structures - CS 2201', type: 'PDF', size: '5.1 MB', downloads: 345 },
        { id: 152, name: 'Algorithms Analysis - CS 2202', type: 'PDF', size: '4.9 MB', downloads: 298 },
        { id: 153, name: 'Operating Systems - CS 2203', type: 'PDF', size: '5.3 MB', downloads: 276 },
        { id: 154, name: 'Database Systems - CS 2204', type: 'PDF', size: '4.8 MB', downloads: 234 },
        { id: 155, name: 'Computer Networks - CS 2205', type: 'PDF', size: '5.2 MB', downloads: 198 },
        { id: 156, name: 'Software Engineering - CS 2206', type: 'PDF', size: '6.1 MB', downloads: 267 },
        { id: 157, name: 'Object-Oriented Programming - CS 2207', type: 'PDF', size: '4.6 MB', downloads: 189 },
        { id: 158, name: 'Computer Architecture - CS 2208', type: 'PDF', size: '4.7 MB', downloads: 156 },
        { id: 159, name: 'Probability & Statistics - CS 2209', type: 'PDF', size: '4.2 MB', downloads: 223 },
        { id: 160, name: 'Assembly Language - CS 2210', type: 'PDF', size: '4.4 MB', downloads: 167 },
        { id: 161, name: 'Web Programming - CS 2211', type: 'PDF', size: '5.0 MB', downloads: 145 },
        { id: 162, name: 'Computer Graphics - CS 2212', type: 'PDF', size: '4.9 MB', downloads: 201 },
        { id: 163, name: 'Theory of Computation - CS 2213', type: 'PDF', size: '4.3 MB', downloads: 134 },
        { id: 164, name: 'Human-Computer Interaction - CS 2214', type: 'PDF', size: '4.1 MB', downloads: 178 },
        { id: 165, name: 'Programming Languages - CS 2215', type: 'PDF', size: '4.5 MB', downloads: 156 }
      ],
      year3: [
        { id: 166, name: 'Machine Learning - CS 3301', type: 'PDF', size: '5.7 MB', downloads: 412 },
        { id: 167, name: 'Artificial Intelligence - CS 3302', type: 'PDF', size: '6.2 MB', downloads: 378 },
        { id: 168, name: 'Distributed Systems - CS 3303', type: 'PDF', size: '5.4 MB', downloads: 298 },
        { id: 169, name: 'Compiler Design - CS 3304', type: 'PDF', size: '5.8 MB', downloads: 267 },
        { id: 170, name: 'Cybersecurity - CS 3305', type: 'PDF', size: '5.1 MB', downloads: 345 },
        { id: 171, name: 'Advanced Algorithms - CS 3306', type: 'PDF', size: '5.5 MB', downloads: 234 },
        { id: 172, name: 'Computer Vision - CS 3307', type: 'PDF', size: '6.0 MB', downloads: 189 },
        { id: 173, name: 'Natural Language Processing - CS 3308', type: 'PDF', size: '5.3 MB', downloads: 276 },
        { id: 174, name: 'Parallel Computing - CS 3309', type: 'PDF', size: '4.9 MB', downloads: 156 },
        { id: 175, name: 'Software Architecture - CS 3310', type: 'PDF', size: '5.2 MB', downloads: 223 },
        { id: 176, name: 'Data Mining - CS 3311', type: 'PDF', size: '5.6 MB', downloads: 167 },
        { id: 177, name: 'Final Year Project - CS 3312', type: 'PDF', size: '4.1 MB', downloads: 312 },
        { id: 178, name: 'Research Methods - CS 3313', type: 'PDF', size: '3.8 MB', downloads: 245 },
        { id: 179, name: 'Advanced Topics in CS - CS 3314', type: 'PDF', size: '5.4 MB', downloads: 201 },
        { id: 180, name: 'Professional Practice - CS 3315', type: 'PDF', size: '3.6 MB', downloads: 178 }
      ]
    }
  };

  const getAllDocuments = () => {
    const allDocs = [];
    Object.keys(documents).forEach(category => {
      Object.keys(documents[category]).forEach(year => {
        allDocs.push(...documents[category][year]);
      });
    });
    return allDocs;
  };

  const getFilteredDocuments = () => {
    let filteredDocs = [];
    
    if (selectedCategory === 'all') {
      if (selectedYear === 'all') {
        filteredDocs = getAllDocuments();
      } else {
        Object.keys(documents).forEach(category => {
          if (documents[category][selectedYear]) {
            filteredDocs.push(...documents[category][selectedYear]);
          }
        });
      }
    } else {
      if (selectedYear === 'all') {
        Object.keys(documents[selectedCategory]).forEach(year => {
          filteredDocs.push(...documents[selectedCategory][year]);
        });
      } else {
        filteredDocs = documents[selectedCategory][selectedYear] || [];
      }
    }
    
    if (searchTerm) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredDocs;
  };

  const filteredDocuments = getFilteredDocuments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Course Notes & Question Banks
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Access comprehensive study materials organized by program and year of study
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[180px] text-sm sm:text-base"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[120px] text-sm sm:text-base"
              >
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category and Year Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${
                  selectedYear === year.id
                    ? 'bg-secondary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {year.name}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-primary-500" />
                </div>
                <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {document.type}
                </span>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{document.name}</h3>
              
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-4">
                <span>Size: {document.size}</span>
                <span>{document.downloads} downloads</span>
              </div>
              
              <button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Upload Request */}
        <div className="mt-12 bg-primary-500 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-sm sm:text-base text-blue-100 mb-6">
            Request specific notes or contribute your own study materials to help fellow students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Request Notes
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              Contribute Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;