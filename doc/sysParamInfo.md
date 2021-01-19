
     * 数量小数位数
     */
    NUMBER_DIG("numberDig"),
    /**
     * 单价小数位数
     */
    UNIT_PRICE_DIG("unitPriceDig"),

    /**
     * 本位币小数位数
     */
    STANDARD_CURRENCY_DIG("standardCurrencyDig"),

    /**
     * 外币小数位数
     */
    FOREIGN_CURRENCY_DIG("foreignCurrencyDig"),
    /**
     * 凭证处理方式 例:1,3  表示选中了1和3。2未选
     * 1-制单人和审核人可以为同一人
     * 2-只能由制单人本人修改凭证
     * 3-允许修改业务模块生成的凭证
     */
    CERT_DEAL_MODE("certDealMode"),

    /**
     * 月结控制——业务模块未完成月结0-禁止 1-提示 2-不控制
     */
    MONTHLY_CLOSE_LIMIT_01("monthlyCloseLimit01"),

    /**
     * 月结控制——收入支出科目有余额0-禁止 1-提示 2-不控制
     */
    MONTHLY_CLOSE_LIMIT_02("monthlyCloseLimit02"),

    /**
     * 年结控制——收入支出科目有余额0-禁止 1-提示 2-不控制
     */
    YEARLY_CLOSE_LIMIT_01("yearlyCloseLimit01"),

    /**
     * 业务凭证规则——凭证日期1-业务日期 2-审核日期 3-生成日期
      */
    BUSINESS_CERT_RULE_01("bussinessCertRule01"),

    /**
     * 业务凭证规则——凭证记账日期小于总账最大凭证日期默认取最大凭证日期 0-未选 1-选中
     */
    BUSINESS_CERT_RULE_02("bussinessCertRule02"),

    /**
     * 出纳登账方式——启用单据登账 0-未选 1-选中
     */
    CASH_REGIST_ENTRY_MODE("cashRegistEntryMode"),

    /**
     * 打印设置 例如:1,3,5  表示选中了1，3，5 ，未选2，4
     * 1-相同科目合并打印
     * 2-打印辅助核算项
     * 3-打印数量单价
     * 4-打印外币汇率
     * 5-不打印科目代码
     */
    PRINT_SETTING("printSetting")