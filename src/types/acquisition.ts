export interface AcquisitionCase {
    id: string;
    case_no: string;
    title: string;
    category: '捐贈' | '移撥' | '價購' | '徵集';
    status: '草稿' | '評估中' | '審議中' | '已核定' | '已撤案' | '已結案';
    applicant?: string;
    owner_contact?: string;
    in_charge?: string;
    description?: string;
    target_date?: string;
    created_at: string;
    updated_at: string;
}

export interface AcquisitionAttachment {
    id: string;
    case_id: string;
    file_name: string;
    file_path: string;
    file_type?: string;
    created_at: string;
}
