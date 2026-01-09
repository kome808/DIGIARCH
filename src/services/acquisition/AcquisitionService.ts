import { AcquisitionRepository } from '../../repositories/acquisition/AcquisitionRepository';
import { AcquisitionCase } from '../../types/acquisition';

export class AcquisitionService {
    /**
     * 獲取案件列表並處理可能的錯誤
     */
    static async getAllCases() {
        try {
            const { data, error } = await AcquisitionRepository.getCases();
            if (error) {
                console.error('Failed to fetch acquisition cases:', error);
                throw error;
            }
            return data || [];
        } catch (err) {
            console.error('Error in AcquisitionService.getAllCases:', err);
            throw err;
        }
    }

    /**
     * 產生下一個案件編號 (範例: ACQ-2026-XXX)
     */
    static generateCaseNo(lastCount: number = 0) {
        const year = new Date().getFullYear();
        const nextId = (lastCount + 1).toString().padStart(3, '0');
        return `ACQ-${year}-${nextId}`;
    }

    /**
     * 建立謝里法案範例資料
     */
    static async createDemoCase() {
        const demo: Partial<AcquisitionCase> = {
            case_no: this.generateCaseNo(0),
            title: '謝里法檔案捐贈案 (Demo)',
            category: '捐贈',
            status: '評估中',
            applicant: '謝里法家屬',
            in_charge: 'UX團隊',
            description: '測試用的謝里法案範例資料。'
        };
        return await AcquisitionRepository.createCase(demo);
    }
}
