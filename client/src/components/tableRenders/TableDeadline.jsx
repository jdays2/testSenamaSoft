import React from 'react';
import { calculateDeadlineStatus } from '../../utils/calculateDeadlineStatus';
import { Col, Flex, Popover, Tag } from 'antd';
import { FaInfoCircle } from 'react-icons/fa';

export const TableDeadline = ({ record }) => {
	const { created, deadline } = record;
	const deadlineChecker = calculateDeadlineStatus(deadline);
  const isOkey = deadlineChecker.isExpired ? 'red' : 'orange';

	return (
		<Flex
			align="center"
			diraction="column">
			<Tag
				className="table__deadline-tag"
				color={isOkey}
				key={deadline}>
				{deadlineChecker.isExpired ? 'EXPIRED' : deadlineChecker.timeDifference.value + ' ' + deadlineChecker.timeDifference.unit}
			</Tag>
			<Popover
				placement="right"
				content={
					<Flex vertical="false">
						<Col
							span={24}
							className="card-detail__col">
							<strong className="card-detail__col-title">Created:</strong>
							<span className="card-detail__col-vlaue">{created}</span>
						</Col>
						<Col
							span={24}
							className="card-detail__col">
							<strong className="card-detail__col-title">Deadline:</strong>
							<span className="card-detail__col-vlaue">{deadline}</span>
						</Col>
					</Flex>
				}
				arrow={false}>
				<FaInfoCircle className="table__info" />
			</Popover>
		</Flex>
	);
};
