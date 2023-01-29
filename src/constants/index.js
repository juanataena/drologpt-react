// API CALLS
export const ACCOUNTS_NS = 'https://accounts.';
export const GIGYA_NS = '.gigya.com/';
export const IDX_SEARCH = 'idx.search';
export const ADMIN_SET_SITE_CONFIG = 'admin.setSiteConfig';
export const IDX_CREATE_SCHEDULE = 'idx.createScheduling';

export const SET_SITE_CONFIG_US = 'https://accounts.us1.gigya.com/admin.setSiteConfig';
export const GET_SITE_CONFIG_US = 'https://accounts.us1.gigya.com/admin.getSiteConfig';
export const GET_PARTNER_SITES_US = 'https://accounts.us1.gigya.com/admin.getPartnerSites';
export const GET_JWT_PUBLIC_KEY = 'https://accounts.eu1.gigya.com/accounts.getJWTPublicKey';
export const VALIDATE_GIGYA_JWT = 'https://juan.gigya-cs.com/jwt/validate.php';

// QUERIES
export const QUERY_ALL_GLOBAL_CONFIGS = 'select * from global-config  ORDER BY updateTime DESC';
export const QUERY_ONE_GLOBAL_CONFIG = 'select * from global-config where id="';
export const QUERY_ONE_GLOBAL_CONFIG_BY_NAME = 'select * from global-config where name="';
export const QUERY_ONE_SCHEDULE_FOR_GLOBAL_CONFIG = 'select * from scheduling where global-configId="';
export const QUERY_END = '"';
