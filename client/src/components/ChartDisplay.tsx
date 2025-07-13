import React, { useMemo } from 'react';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { HCRecord } from '../types';

const { Title } = Typography;

interface ChartDisplayProps {
  data: HCRecord[];
  loading: boolean;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, loading }) => {
  // 按部门统计数据
  const departmentChartData = useMemo(() => {
    const stats = data.reduce((acc, record) => {
      if (!acc[record.department]) {
        acc[record.department] = 0;
      }
      acc[record.department] += record.hc_count;
      return acc;
    }, {} as Record<string, number>);

    const departments = Object.keys(stats).sort();
    const values = departments.map(dept => stats[dept]);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: departments,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'HC数量'
      },
      series: [{
        name: 'HC数量',
        type: 'bar',
        data: values,
        itemStyle: {
          color: '#1890ff'
        },
        emphasis: {
          itemStyle: {
            color: '#40a9ff'
          }
        }
      }]
    };
  }, [data]);

  // 按月份统计数据
  const monthChartData = useMemo(() => {
    const stats = data.reduce((acc, record) => {
      if (!acc[record.month]) {
        acc[record.month] = 0;
      }
      acc[record.month] += record.hc_count;
      return acc;
    }, {} as Record<string, number>);

    const months = Object.keys(stats).sort();
    const values = months.map(month => stats[month]);

    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: 'HC数量'
      },
      series: [{
        name: 'HC数量',
        type: 'line',
        data: values,
        smooth: true,
        itemStyle: {
          color: '#52c41a'
        },
        areaStyle: {
          color: 'rgba(82, 196, 26, 0.2)'
        }
      }]
    };
  }, [data]);

  // 部门月份热力图数据
  const heatmapChartData = useMemo(() => {
    const departments = [...new Set(data.map(r => r.department))].sort();
    const months = [...new Set(data.map(r => r.month))].sort();

    const heatmapData: [number, number, number][] = [];
    const maxValue = Math.max(...data.map(r => r.hc_count));

    departments.forEach((dept, deptIndex) => {
      months.forEach((month, monthIndex) => {
        const records = data.filter(r => r.department === dept && r.month === month);
        const total = records.reduce((sum, r) => sum + r.hc_count, 0);
        if (total > 0) {
          heatmapData.push([monthIndex, deptIndex, total]);
        }
      });
    });

    return {
      tooltip: {
        position: 'top',
        formatter: function(params: any) {
          return `${departments[params.data[1]]}<br/>${months[params.data[0]]}<br/>HC数量: ${params.data[2]}`;
        }
      },
      grid: {
        height: '50%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: months,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: departments,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: maxValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        inRange: {
          color: ['#e6f7ff', '#1890ff']
        }
      },
      series: [{
        name: 'HC数量',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  }, [data]);

  if (loading) {
    return (
      <Card className="chart-container">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>加载中...</div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="chart-container">
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
          <BarChartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <div>暂无数据，请先上传Excel文件</div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="chart-container">
            <Title level={4}>
              <BarChartOutlined /> 各部门HC统计
            </Title>
            <ReactECharts
              option={departmentChartData}
              style={{ height: '400px' }}
              opts={{ renderer: 'svg' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="chart-container">
            <Title level={4}>
              <LineChartOutlined /> 月度HC趋势
            </Title>
            <ReactECharts
              option={monthChartData}
              style={{ height: '400px' }}
              opts={{ renderer: 'svg' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="chart-container" style={{ marginTop: 16 }}>
        <Title level={4}>部门月度HC热力图</Title>
        <ReactECharts
          option={heatmapChartData}
          style={{ height: '500px' }}
          opts={{ renderer: 'svg' }}
        />
      </Card>
    </div>
  );
};

export default ChartDisplay;
