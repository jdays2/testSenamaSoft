import { Col, Empty, Row, Space, Spin, Tooltip, Typography } from 'antd';
import { RiQuestionFill } from 'react-icons/ri';
import React from 'react';
import TodoCard from './TodoCard';
import { useOutletContext, useParams } from 'react-router-dom';
import { BackBtn } from './ui/BackBtn';
import { useSortedList } from '../hooks/useSortedList';
import useTitle from '../hooks/useTitle';

const { Title } = Typography;

export const Board = () => {
	const { date } = useParams();
	const [sortBy] = useOutletContext();
	const { isLoading, sortedList } = useSortedList(sortBy, date);
	
	useTitle(`${date} list`);

	return (
		<>
			<Row>
				<BackBtn />
			</Row>
			<Row>
				<Space>
					<Title
						level={3}
						style={{ marginTop: '20px' }}>
						Activity per {date}
					</Title>

					<Tooltip
						placement="rightTop"
						title={`Here are the todos you created on ${date}. Take a moment to review and manage your tasks from that day.
					`}>
						<RiQuestionFill className="question-mark" />
					</Tooltip>
				</Space>
				<div className="list">
					<Spin
						className="spinner"
						spinning={isLoading}
						size="large"
					/>
					<Row gutter={[48, 24]}>
						{sortedList.length
							? sortedList.map((card) => {
									return (
										<Col
											span={Math.floor(24 / Math.min(sortedList.length, 4))}
											key={card._id}>
											<TodoCard card={card} />
										</Col>
									);
							  })
							: !isLoading && <Empty className="empty" />}
					</Row>
				</div>
			</Row>
		</>
	);
};
