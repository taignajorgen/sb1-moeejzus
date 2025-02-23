import { query } from '../db';
import { Business } from '../types';

export async function getBusinesses(): Promise<Partial<Business>[]> {
  try {
    const result = await query(`
      SELECT 
        b.*,
        json_agg(DISTINCT jsonb_build_object(
          'quarter', qr.quarter,
          'revenue', qr.revenue
        )) as quarterly_revenue,
        json_agg(DISTINCT jsonb_build_object(
          'label', km.label,
          'value', km.value,
          'change', km.change
        )) as key_metrics,
        json_agg(DISTINCT jsonb_build_object(
          'date', ni.date,
          'title', ni.title,
          'source', ni.source
        )) as recent_news
      FROM businesses b
      LEFT JOIN quarterly_revenues qr ON b.id = qr.business_id
      LEFT JOIN key_metrics km ON b.id = km.business_id
      LEFT JOIN news_items ni ON b.id = ni.business_id
      GROUP BY b.id
    `);
    
    return result.rows;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
}

export async function getBusinessById(id: string): Promise<Partial<Business> | null> {
  try {
    const result = await query(`
      SELECT 
        b.*,
        json_agg(DISTINCT jsonb_build_object(
          'quarter', qr.quarter,
          'revenue', qr.revenue
        )) as quarterly_revenue,
        json_agg(DISTINCT jsonb_build_object(
          'label', km.label,
          'value', km.value,
          'change', km.change
        )) as key_metrics,
        json_agg(DISTINCT jsonb_build_object(
          'date', ni.date,
          'title', ni.title,
          'source', ni.source
        )) as recent_news
      FROM businesses b
      LEFT JOIN quarterly_revenues qr ON b.id = qr.business_id
      LEFT JOIN key_metrics km ON b.id = km.business_id
      LEFT JOIN news_items ni ON b.id = ni.business_id
      WHERE b.id = $1
      GROUP BY b.id
    `, [id]);
    
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching business:', error);
    throw error;
  }
}