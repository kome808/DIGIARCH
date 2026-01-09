import { getSupabaseClient } from '../../adapters/supabase/client';
import { AcquisitionCase } from '../../types/acquisition';

export class AcquisitionRepository {
    private static TABLE = 'acquisition_cases';

    /**
     * 獲取所有徵集案件列表
     */
    static async getCases() {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from(this.TABLE)
            .select('*')
            .order('created_at', { ascending: false });

        return { data: data as AcquisitionCase[] | null, error };
    }

    /**
     * 獲取單一案件詳情
     */
    static async getCaseById(id: string) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from(this.TABLE)
            .select('*, acquisition_attachments(*)')
            .eq('id', id)
            .maybeSingle();

        return { data: data as (AcquisitionCase & { acquisition_attachments: any[] }) | null, error };
    }

    /**
     * 建立新案件
     */
    static async createCase(caseData: Partial<AcquisitionCase>) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from(this.TABLE)
            .insert([caseData])
            .select()
            .single();

        return { data: data as AcquisitionCase | null, error };
    }

    /**
     * 更新案件狀態或內容
     */
    static async updateCase(id: string, updates: Partial<AcquisitionCase>) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from(this.TABLE)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        return { data: data as AcquisitionCase | null, error };
    }
}
