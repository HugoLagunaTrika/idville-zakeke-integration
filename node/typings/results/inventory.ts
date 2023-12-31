// Generated by https://quicktype.io

export interface Inventory {
    skuId:   string;
    balance: Balance[];
}

export interface Balance {
    warehouseId:          string;
    warehouseName:        string;
    totalQuantity:        number;
    reservedQuantity:     number;
    hasUnlimitedQuantity: boolean;
    timeToRefill:         null;
    dateOfSupplyUtc:      null;
}
