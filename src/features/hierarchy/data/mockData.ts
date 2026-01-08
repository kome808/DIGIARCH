export interface HierarchyNode {
    id: string;
    type: 'fonds' | 'series' | 'file_unit';
    title: string;
    children: HierarchyNode[];
    count?: number;
}

export const initialHierarchyData: HierarchyNode[] = [
    {
        id: 'F01', type: 'fonds', title: '謝里法全宗',
        children: [
            {
                id: 'S01', type: 'series', title: '藝術家資料',
                children: [
                    { id: 'FU01', type: 'file_unit', title: '手稿', children: [], count: 12 },
                    { id: 'FU02', type: 'file_unit', title: '書信', children: [], count: 45 },
                    { id: 'FU03', type: 'file_unit', title: '照片', children: [], count: 128 }
                ]
            },
            {
                id: 'S02', type: 'series', title: '展覽資料',
                children: []
            }
        ]
    }
];
