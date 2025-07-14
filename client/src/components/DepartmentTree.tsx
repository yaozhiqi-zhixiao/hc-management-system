import React, { useState, useEffect } from 'react';
import { Tree, Card, Typography, Input, Button, Space } from 'antd';
import { HCRecord } from '../types';

const { Title } = Typography;
const { Search } = Input;

interface DepartmentTreeProps {
  data: HCRecord[];
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
}

interface DepartmentNode {
  key: string;
  title: string;
  children?: DepartmentNode[];
}

const DepartmentTree: React.FC<DepartmentTreeProps> = ({
  data,
  selectedDepartments,
  onDepartmentChange
}) => {
  const [treeData, setTreeData] = useState<DepartmentNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>(selectedDepartments);
  const [searchValue, setSearchValue] = useState('');

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
            children: []
          };

          departmentMap.set(currentPath, node);

          if (parentNode) {
            parentNode.children!.push(node);
          } else {
            rootNodes.push(node);
          }
        }

        parentNode = departmentMap.get(currentPath)!;
      });
    });

    return rootNodes;
  };

  const getAllKeys = (nodes: DepartmentNode[]): string[] => {
    let keys: string[] = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.children && node.children.length > 0) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
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

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue);
  };

  const onCheck = (checkedKeysValue: any) => {
    const keys = Array.isArray(checkedKeysValue) ? checkedKeysValue : checkedKeysValue.checked;
    setCheckedKeys(keys);
    onDepartmentChange(keys);
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

  return (
    <Card
      size="small"
      style={{
        width: 280,
        height: 'fit-content',
        maxHeight: '80vh'
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
          部门筛选
        </Title>
        <Space size="small" style={{ marginBottom: 8 }}>
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
        maxHeight: 'calc(80vh - 100px)',
        overflowY: 'auto'
      }}>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
          style={{ fontSize: '13px' }}
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
