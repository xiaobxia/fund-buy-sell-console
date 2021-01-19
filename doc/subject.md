/**
 * 父级ID(一级科目默认为0）
 */
@Column(name = "PARENT_ID")
private Long parentId;

/**
 * 组织ID
 */
@Column(name = "ORG_ID")
private Long orgId;

/**
 * 账本ID
 */
@Column(name = "BOOK_ID")
private Long bookId;

/**
 * 科目年份
 */
@Column(name = "SUB_YEAR")
private Long subYear;

/**
 * 科目等级
 */
@Column(name = "SUB_LEVELS")
private Long subLevels;

/**
 * 科目编码
 */
@Column(name = "ENCODE")
private String encode;

/**
 * 科目名称
 */
@Column(name = "NAME")
private String name;

/**
 * 科目类别
 */
@Column(name = "SUB_TYPE")
private String subType;

/**
 * 余额方向 1借方 2贷方
 */
@Column(name = "BALANCE_TYPE")
private Long balanceType;

/**
 * 状态  1启用  2禁用
 */
@Column(name = "STATUS")
private Long status;

/**
 * 受控系统
 */
@Column(name = "CONTRO_SYSTEM")
private Long controSystem;

/**
 * 外币核算 0未选 1选中 2禁用
 */
@Column(name = "FOREIGN_CHECK")
private Long foreignCheck;

/**
 * 辅助核算 0未选 1选中 2禁用
 */
@Column(name = "ASSIST_CHECK")
private Long assistCheck;

/**
 * 数量核算 0未选 1选中 2禁用
 */
@Column(name = "AMOUNT_CHECK")
private Long amountCheck;

/**
 * 数量单位
 */
@Column(name = "UNIT")
private String unit;

/**
 * 创建者
 */
@Column(name = "CREATOR")
private Long creator;

/**
 * 创建时间
 */
@Column(name = "NG_INSERT_DT")
private LocalDateTime ngInsertDt;

/**
 * 主键ID
 */
@Id
@Column(name = "PHID")
private Long phid;

/**
 * 科目特征: 1现金  2银行
 */
@Column(name = "FEATURE")
private String feature;

/**
 * 末级科目（0不是1是）
 */
@Column(name = "END")
private Long end;