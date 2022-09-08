import { TableColumn, TableV2 } from "@meshkorea/vroong-design-system-web";
import React, { useCallback } from "react";
import styled from "styled-components";

import GitUser from "../../models/GitUser";
import Label from "../../models/Label";
import PullRequest from "../../models/PullRequest";

interface PrDetailListProps {
  data: PullRequest[];
}

const PrDetailList = ({ data }: PrDetailListProps) => {
  const columns: Array<TableColumn> = [
    {
      Header: "라벨",
      accessor: "labels",
      width: 200,
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell: ({ cell }: any) =>
        cell.row.values.labels.map((label: Label) => (
          <LabelWrapper key={label.id} color={label.color}>
            <span>{label.name}</span>
          </LabelWrapper>
        )),
    },
    {
      Header: "제목",
      accessor: "title",
      width: 450,
    },
    {
      Header: "담당자",
      accessor: "assignees",
      width: 150,
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell: ({ cell }: any) => (
        <AssigneeArea>
          {cell.row.values.assignees.map((assignee: GitUser) => (
            <Assignee>
              <AssigneeAvatar src={assignee.avatarUrl} alt={assignee.name} />
              <span key={assignee.name}>{assignee.name}</span>
            </Assignee>
          ))}
        </AssigneeArea>
      ),
    },
  ];

  const handleRowClick = useCallback((row: PullRequest) => {
    window.open(row.htmlUrl, "_blank");
  }, []);

  return (
    <TableV2
      height="400px"
      columns={columns}
      data={data}
      hasIndexNum={false}
      onRowClick={handleRowClick}
    />
  );
};

const LabelWrapper = styled.div<{ color: string }>`
  box-sizing: border-box;
  display: inline-block;
  padding: 2px 4px;
  background-color: ${({ color }) => `#${color}`};
  border-radius: 5px;

  span {
    font-size: 0.75rem;
    color: ${({ color }) => `#${color}`};
    filter: invert(100%);
  }
`;

const AssigneeArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Assignee = styled.div`
  display: flex;
  gap: 3px;
`;

const AssigneeAvatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

export default PrDetailList;
