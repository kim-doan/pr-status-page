import { BaseTheme, Card } from "@meshkorea/vroong-design-system-web";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { prChartCategoriesState } from "modules/pr-status/pr-dashboard/states/PullRequestState";

const GraphCard = () => {
  const categoriesState = useRecoilValue(prChartCategoriesState);

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "PR 마감 현황",
    },
    subtitle: {
      text: "(월간)",
    },
    xAxis: {
      categories:
        categoriesState &&
        Array.from(categoriesState.keys()).map((key) => `${key.toString()}월`),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "횟수",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} 회</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        type: "column",
        name: "전체 마감 PR",
        color: BaseTheme.palette.core.BaseAccent,
        data:
          categoriesState &&
          Array.from(categoriesState.values()).map((value) => value.all.length),
      },
      {
        type: "column",
        name: "납기 내 마감 PR",
        color: BaseTheme.palette.core.BaseSuccess,
        data:
          categoriesState &&
          Array.from(categoriesState.values()).map(
            (value) => value.good.length,
          ),
      },
      {
        type: "column",
        name: "납기 이후 마감 PR",
        color: BaseTheme.palette.core.BaseCritical,
        data:
          categoriesState &&
          Array.from(categoriesState.values()).map((value) => value.bad.length),
      },
    ],
  };

  return (
    <CardWrapper>
      <StyledCard radius="5px">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </StyledCard>
    </CardWrapper>
  );
};
const CardWrapper = styled.div<{ onClick?: () => void }>`
  flex: 1;
  overflow: hidden;
  color: #121828;
  box-shadow: 0 1px 1px rgb(100 116 139 / 6%), 0 1px 2px rgb(100 116 139 / 10%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledCard = styled(Card)`
  padding: 32px 24px;
`;
export default GraphCard;
