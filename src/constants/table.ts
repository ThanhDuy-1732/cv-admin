// Utilities
import { TableColumnsType } from "ant-design-vue";

export const BASE_COLUMNS: TableColumnsType = [
  {
    key: 'id',
    title: 'Index',
    dataIndex: 'id',
  },
  {
    title: 'ID MongoDB',
    key: '_id',
    dataIndex: '_id',
  },
]

export const AWARDS_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: 'Position',
    key: 'position',
    dataIndex: 'position',
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
];

export const EDUCATION_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
  },
  {
    title: 'Score',
    key: 'score',
    dataIndex: 'score',
  },
  {
    title: 'More',
    key: 'subInfo',
    dataIndex: 'subInfo'
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]

export const INFORMATION_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Content',
    key: 'content',
    dataIndex: 'content',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]

export const OVERVIEW_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Content',
    key: 'value',
    dataIndex: 'value',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]

export const PROJECT_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'company',
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: 'Position',
    key: 'position',
    dataIndex: 'position',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]

export const SKILL_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Skills',
    key: 'skills',
    dataIndex: 'skills',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]

export const WORK_COLUMNS: TableColumnsType = [
  ...BASE_COLUMNS,
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'company',
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: 'Position',
    key: 'position',
    dataIndex: 'position',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    width: 200,
    key: 'actions',
    fixed: 'right',
    title: 'Action',
  },
]