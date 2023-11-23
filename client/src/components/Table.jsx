import React, { useState } from 'react';
import { useSortedList } from '../hooks/useSortedList';
import { useOutletContext } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import {
	Spin,
	Typography,
	Tag,
	Table,
	Space,
	Flex,
	Button,
	Tooltip,
	Col,
	Popover,
} from 'antd';
import { PriorityIcon } from './PriorityIcon';
import { TypeIcon } from './TypeIcon';
import { useDispatch } from 'react-redux';
import { setActiveTodoId } from '../redux/slices/todosSlice';
import { toggleModal } from '../redux/slices/modalsSlice';
import { RiQuestionFill } from 'react-icons/ri';
import { calculateDeadlineStatus } from '../utils/calculateDeadlineStatus';
import { TableStatus } from './tableRenders/TableStatus';
import { TableType } from './tableRenders/TableType';
import { TablePriority } from './tableRenders/TablePriority';
import { TableEdit } from './tableRenders/TableEdit';
import { TableDeadline } from './tableRenders/TableDeadline';
const { Column } = Table;
const { Title } = Typography;

export const TableBlock = () => {
	const [sortBy] = useOutletContext();
	const { isLoading, sortedList } = useSortedList(sortBy);

	const [filters, setFilters] = useState({});

	const handleTableChange = (pagination, filters, sorter) => {
		setFilters(filters);
	};

	return (
		<div className="table">
			<Space style={{ marginBottom: '20px' }}>
				<Title
					level={3}
					style={{ marginTop: '20px' }}
					onChange={handleTableChange}>
					Table
				</Title>

				<Tooltip
					placement="rightTop"
					title={`Welcome to your Todo Tasks table! Here, you can view, sort, and modify your tasks to stay organized and productive.
					`}>
					<RiQuestionFill className="question-mark" />
				</Tooltip>
			</Space>
			<Spin
				className="spinner"
				spinning={isLoading}
				size="large"
			/>

			{sortedList && (
				<Table
					dataSource={sortedList}
					size="medium">
					<Column
						align="left"
						width="190px"
						title="Title"
						dataIndex="title"
						key="firstName"
						render={(title) => <Title level={5}>{title}</Title>}
					/>
					<Column
						width="140px"
						title="Deadline"
						dataIndex="deadline"
						key="deadline"
						filters={[
							{ text: 'EXPIRED', value: 'overdue' },
							{ text: 'Active', value: 'not_overdue' },
						]}
						onFilter={(value, record) => {
							const deadlineChecker = calculateDeadlineStatus(record.deadline);
							return (
								(value === 'overdue' && deadlineChecker.isExpired === true) ||
								(value !== 'overdue' && deadlineChecker.isExpired !== true)
							);
						}}
						sorter={(a, b) => {
							const deadlineCheckerA = calculateDeadlineStatus(a.deadline);
							const deadlineCheckerB = calculateDeadlineStatus(b.deadline);

							if (deadlineCheckerA.isExpired && !deadlineCheckerB.isExpired) {
								// If a is expired but b is not, place a at the bottom
								return 1;
							} else if (
								!deadlineCheckerA.isExpired &&
								deadlineCheckerB.isExpired
							) {
								// If b is expired but a is not, place b at the bottom
								return -1;
							} else {
								// If both are expired or not expired, sort based on the deadline
								return deadlineCheckerA.timeDiff - deadlineCheckerB.timeDiff;
							}
						}}
						render={(_, record) => <TableDeadline record={record} />}
					/>
					<Column
						width="100px"
						title="Status"
						dataIndex="status"
						key="status"
						render={(status, record) => <TableStatus status={status} card={record} />}
					/>
					<Column
						width="460px"
						title="Body"
						dataIndex="body"
						key="body"
					/>
					<Column
						title="Type"
						dataIndex="type"
						key="type"
						filters={[
							{ text: 'Personal', value: 'Personal' },
							{ text: 'Work', value: 'Work' },
						]}
						onFilter={(value, record) => record.type === value}
						render={(type) => <TableType type={type} />}
					/>
					<Column
						title="Priority"
						dataIndex="priority"
						key="priority"
						filters={[
							{ text: 'critical', value: 'critical' },
							{ text: 'urgent', value: 'urgent' },
							{ text: 'standard', value: 'standard' },
						]}
						onFilter={(value, record) => record.priority === value}
						render={(priority) => <TablePriority priority={priority} />}
					/>
					<Column
						width="60px"
						title="Action"
						key="action"
						dataIndex="_id"
						render={(id) => <TableEdit id={id} />}
					/>
				</Table>
			)}
		</div>
	);
};
