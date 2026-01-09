import {
    Search,
    LayoutDashboard,
    Inbox,
    FolderTree,
    Warehouse,
    Scan,
    Tags,
    Globe,
    BookOpen,
    BarChart,
    Settings
} from 'lucide-react';

export interface MenuItem {
    title: string;
    key: string;
    icon?: any; // LucideIcon type
    path: string;
    children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        title: '整合查詢',
        key: 'integrated-search',
        icon: Search,
        path: '/admin/integrated-search'
    },
    {
        title: '首頁與待辦',
        key: 'dashboard',
        icon: LayoutDashboard,
        path: '/admin/dashboard',
        children: [
            { title: '儀表板', key: 'dashboard-main', path: '/admin/dashboard' },
            { title: '我的待辦', key: 'dashboard-tasks', path: '/admin/dashboard/tasks' },
            { title: '通知中心', key: 'dashboard-notifications', path: '/admin/dashboard/notifications' },
        ]
    },
    {
        title: '徵集審議作業',
        key: 'acquisition',
        icon: Inbox,
        path: '/admin/acquisition',
        children: [
            { title: '新增案件', key: 'acquisition-new', path: '/admin/acquisition/new' },
            { title: '案件列表', key: 'acquisition-list', path: '/admin/acquisition/list' },
        ]
    },
    {
        title: '全宗架構管理',
        key: 'fonds-management',
        icon: FolderTree,
        path: '/admin/fonds-management',
        children: [
            { title: '架構維護', key: 'fonds-structure', path: '/admin/fonds-management/structure' },
            { title: '匯入匯出', key: 'fonds-import-export', path: '/admin/fonds-management/io' },
        ]
    },
    {
        title: '入庫作業管理',
        key: 'intake-management',
        icon: Warehouse,
        path: '/admin/intake-management',
        children: [
            { title: '入庫批次', key: 'intake-batch', path: '/admin/intake-management/batch' },
            { title: '館藏號管理', key: 'intake-accession', path: '/admin/intake-management/accession' },
            { title: '庫房管理', key: 'intake-storage', path: '/admin/intake-management/storage' },
            { title: '保存修護', key: 'intake-conservation', path: '/admin/intake-management/conservation' },
        ]
    },
    {
        title: '數位化作業',
        key: 'digitization',
        icon: Scan,
        path: '/admin/digitization',
        children: [
            { title: '案件列表', key: 'digitization-list', path: '/admin/digitization/list' },
        ]
    },
    {
        title: '詮釋資料維護',
        key: 'metadata',
        icon: Tags,
        path: '/admin/metadata',
        children: [
            { title: '待編目列表', key: 'metadata-pending', path: '/admin/metadata/pending' },
            { title: '編目作業', key: 'metadata-cataloging', path: '/admin/metadata/cataloging' },
            { title: '資料類型管理', key: 'metadata-schema', path: '/admin/metadata/schema' },
            { title: '匯入匯出', key: 'metadata-io', path: '/admin/metadata/io' },
        ]
    },
    {
        title: '網站管理',
        key: 'website-management',
        icon: Globe,
        path: '/admin/website-management',
        children: [
            { title: '網站架構', key: 'web-structure', path: '/admin/website-management/structure' },
            { title: '主題單元', key: 'web-topics', path: '/admin/website-management/topics' },
            { title: '版型設定', key: 'web-layout', path: '/admin/website-management/layout' },
            { title: '資料上稿', key: 'web-content', path: '/admin/website-management/content' },
            { title: '審核發布', key: 'web-publish', path: '/admin/website-management/publish' },
        ]
    },
    {
        title: '提借(閱)作業',
        key: 'loan-management',
        icon: BookOpen,
        path: '/admin/loan-management',
        children: [
            { title: '申請列表', key: 'loan-list', path: '/admin/loan-management/list' },
            { title: '審查流程', key: 'loan-review', path: '/admin/loan-management/review' },
        ]
    },
    {
        title: '資料統計及報表',
        key: 'statistics',
        icon: BarChart,
        path: '/admin/statistics',
        children: [
            { title: '詮釋統計', key: 'stat-metadata', path: '/admin/statistics/metadata' },
            { title: '前台使用統計', key: 'stat-frontend', path: '/admin/statistics/frontend' },
            { title: '報表匯出', key: 'stat-report', path: '/admin/statistics/report' },
            { title: '稽核紀錄', key: 'stat-audit', path: '/admin/statistics/audit' },
        ]
    },
    {
        title: '系統設定',
        key: 'system-settings',
        icon: Settings,
        path: '/admin/system-settings',
        children: [
            { title: '帳號權限', key: 'sys-account', path: '/admin/system-settings/account' },
            { title: '連線設定', key: 'sys-connection', path: '/admin/system-settings/connection' },
            { title: '閱覽限制', key: 'sys-access-control', path: '/admin/system-settings/access' },
            { title: '流程設定', key: 'sys-workflow', path: '/admin/system-settings/workflow' },
            { title: '參數設定', key: 'sys-params', path: '/admin/system-settings/params' },
        ]
    },
];
