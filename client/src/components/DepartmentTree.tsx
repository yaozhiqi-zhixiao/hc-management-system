import React, { useState, useEffect } from 'react';
import { Tree, Card, Typography, Input, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TreeDataNode } from 'antd';
import { HCRecord } from '../types';

const { Title } = Typography;
const { Search } = Input;

type Key = string | number;

interface DepartmentTreeProps {
  data: HCRecord[];
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
}

interface DepartmentNode {
  key: string;
  title: string;
  children?: DepartmentNode[];
  isLeaf?: boolean;
  count?: number;
}

const DepartmentTree: React.FC<DepartmentTreeProps> = ({
  data,
  selectedDepartments,
  onDepartmentChange
}) => {
  const [treeData, setTreeData] = useState<DepartmentNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(selectedDepartments);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // 构建部门树结构
  const buildDepartmentTree = (records: HCRecord[]): DepartmentNode[] => {
    const departmentMap = new Map<string, DepartmentNode>();
    const rootNodes: DepartmentNode[] = [];

    records.forEach(record => {
      const departmentPath = record.department.split(' > ');
      let currentPath = '';
      let parentNode: DepartmentNode | null = null;

      departmentPath.forEach((dept, index) => {
        currentPath = index === 0 ? dept : `${currentPath} > ${dept}`;

        if (!departmentMap.has(currentPath)) {
          const node: DepartmentNode = {
            key: currentPath,
            title: dept,
            children: [],
            isLeaf: index === departmentPath.length - 1,
            count: 0
          };

          departmentMap.set(currentPath, node);

          if (parentNode) {
            parentNode.children!.push(node);
            parentNode.isLeaf = false;
          } else {
            rootNodes.push(node);
          }
        }

        parentNode = departmentMap.get(currentPath)!;
      });

      // 更新叶子节点的计数
      if (parentNode) {
        parentNode.count = (parentNode.count || 0) + record.hc_count;
      }
    });

    // 递归计算父节点的计数
    const calculateParentCounts = (nodes: DepartmentNode[]): void => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          calculateParentCounts(node.children);
          node.count = node.children.reduce((sum, child) => sum + (child.count || 0), 0);
        }
      });
    };

    calculateParentCounts(rootNodes);

    // 添加计数到标题
    const addCountToTitle = (nodes: DepartmentNode[]): DepartmentNode[] => {
      return nodes.map(node => ({
        ...node,
        title: `${node.title} (${node.count || 0})`,
        children: node.children ? addCountToTitle(node.children) : undefined
      }));
    };

    return addCountToTitle(rootNodes);
  };

  const getAllKeys = (nodes: DepartmentNode[]): string[] => {
    let keys: string[] = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
  };

  const filterTreeData = (nodes: DepartmentNode[], searchValue: string): DepartmentNode[] => {
    return nodes.filter(node => {
      const titleMatch = node.title.toLowerCase().includes(searchValue.toLowerCase());
      const hasMatchingChildren = node.children &&
        filterTreeData(node.children, searchValue).length > 0;

      return titleMatch || hasMatchingChildren;
    }).map(node => ({
      ...node,
      children: node.children ? filterTreeData(node.children, searchValue) : undefined
    }));
  };

  useEffect(() => {
    const tree = buildDepartmentTree(data);
    setTreeData(tree);

    // 默认展开第一层
    const firstLevelKeys = tree.map(node => node.key);
    setExpandedKeys(firstLevelKeys);
  }, [data]);

  useEffect(() => {
    setCheckedKeys(selectedDepartments);
  }, [selectedDepartments]);

  const onExpand = (expandedKeysValue: Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    const keys = Array.isArray(checkedKeysValue) ? checkedKeysValue : checkedKeysValue.checked;
    setCheckedKeys(keys);
    onDepartmentChange(keys.map((key: Key) => String(key)));
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const filteredData = filterTreeData(treeData, value);
      const allKeys = getAllKeys(filteredData);
      setExpandedKeys(allKeys);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys(treeData.map(node => node.key));
      setAutoExpandParent(false);
    }
  };

  const onClearAll = () => {
    setCheckedKeys([]);
    onDepartmentChange([]);
  };

  const onSelectAll = () => {
    const allKeys = getAllKeys(treeData);
    setCheckedKeys(allKeys);
    onDepartmentChange(allKeys);
  };

  const displayTreeData = searchValue ? filterTreeData(treeData, searchValue) : treeData;

  return (
    <Card
      size="small"
      style={{
        width: 280,
        height: 'fit-content',
        maxHeight: '80vh',
        overflow: 'hidden'
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
          部门筛选
        </Title>
        <Search
          placeholder="搜索部门"
          allowClear
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
          style={{ marginBottom: 8 }}
          size="small"
        />
        <Space size="small">
          <Button
            size="small"
            onClick={onSelectAll}
            disabled={checkedKeys.length === getAllKeys(treeData).length}
          >
            全选
          </Button>
          <Button
            size="small"
            onClick={onClearAll}
            disabled={checkedKeys.length === 0}
          >
            清空
          </Button>
        </Space>
      </div>

      <div style={{
        maxHeight: 'calc(80vh - 120px)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={displayTreeData}
          style={{
            fontSize: '13px',
            lineHeight: '20px'
          }}
          height={400}
          virtual={false}
        />
      </div>

      {checkedKeys.length > 0 && (
        <div style={{
          marginTop: 8,
          padding: 8,
          background: '#f5f5f5',
          borderRadius: 4,
          fontSize: '12px',
          color: '#666'
        }}>
          已选择 {checkedKeys.length} 个部门
        </div>
      )}
    </Card>
  );
};

export default DepartmentTree;
