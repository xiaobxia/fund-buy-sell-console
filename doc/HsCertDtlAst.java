package src.main.biz.accounts.web.common.pojo.cert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author liyuan
 * @date 2020-02-17 
 */
@Data
@Entity
@Table(name = "HS_CERT_DTL_AST")
@AllArgsConstructor
@NoArgsConstructor
public class HsCertDtlAst  implements Serializable {

	private static final long serialVersionUID =  8329370343135276159L;
	@Id
	/**
	 * 自增ID
	 */
	@Column(name = "PHID")
	private Long phid;

	/**
	 * 凭证明细ID
	 */
	@Column(name = "CERT_DTL_ID")
	private Long certDtlId;

	/**
	 * 单价(金额)
	 */
	@Column(name = "PRICE")
	private BigDecimal price;

	/**
	 * 数量
	 */
	@Column(name = "NUM")
	private BigDecimal num;

	/**
	 * 外币key
	 */
	@Column(name = "FOREIGN_KEY")
	private String foreignKey;

	/**
	 * 外币汇率
	 */
	@Column(name = "FOREIGN_RATE")
	private BigDecimal foreignRate;

	/**
	 * 金额(金额)
	 */
	@Column(name = "MONEY")
	private BigDecimal money;

	/**
	 * 外汇金额
	 */
	@Column(name = "FOREIGN_MONEY")
	private BigDecimal foreignMoney;

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
	 * 科目编码
	 */
	@Column(name = "SUB_CODE")
	private String subCode;

	/**
	 * 类型01
	 */
	@Column(name = "EXT_01")
	private Long ext01;

	/**
	 * 类型02
	 */
	@Column(name = "EXT_02")
	private Long ext02;

	/**
	 * 类型03
	 */
	@Column(name = "EXT_03")
	private Long ext03;

	/**
	 * 类型04
	 */
	@Column(name = "EXT_04")
	private Long ext04;

	/**
	 * 类型05
	 */
	@Column(name = "EXT_05")
	private Long ext05;

	/**
	 * 类型06
	 */
	@Column(name = "EXT_06")
	private Long ext06;

	/**
	 * 类型07
	 */
	@Column(name = "EXT_07")
	private Long ext07;

	/**
	 * 类型08
	 */
	@Column(name = "EXT_08")
	private Long ext08;

	/**
	 * 类型09
	 */
	@Column(name = "EXT_09")
	private Long ext09;

	/**
	 * 类型10
	 */
	@Column(name = "EXT_10")
	private Long ext10;

	/**
	 * 类型11
	 */
	@Column(name = "EXT_11")
	private Long ext11;

	/**
	 * 类型12
	 */
	@Column(name = "EXT_12")
	private Long ext12;

	/**
	 * 类型13
	 */
	@Column(name = "EXT_13")
	private Long ext13;

	/**
	 * 类型14
	 */
	@Column(name = "EXT_14")
	private Long ext14;

	/**
	 * 类型15
	 */
	@Column(name = "EXT_15")
	private Long ext15;

	/**
	 * 类型16
	 */
	@Column(name = "EXT_16")
	private Long ext16;

	/**
	 * 类型17
	 */
	@Column(name = "EXT_17")
	private Long ext17;

	/**
	 * 类型18
	 */
	@Column(name = "EXT_18")
	private Long ext18;

	/**
	 * 类型19
	 */
	@Column(name = "EXT_19")
	private Long ext19;

	/**
	 * 类型20
	 */
	@Column(name = "EXT_20")
	private Long ext20;

	/**
	 * 类型21
	 */
	@Column(name = "EXT_21")
	private Long ext21;

	/**
	 * 类型22
	 */
	@Column(name = "EXT_22")
	private Long ext22;

	/**
	 * 类型23
	 */
	@Column(name = "EXT_23")
	private Long ext23;

	/**
	 * 类型24
	 */
	@Column(name = "EXT_24")
	private Long ext24;

	/**
	 * 类型25
	 */
	@Column(name = "EXT_25")
	private Long ext25;

	/**
	 * 类型26
	 */
	@Column(name = "EXT_26")
	private Long ext26;

	/**
	 * 类型27
	 */
	@Column(name = "EXT_27")
	private Long ext27;

	/**
	 * 类型28
	 */
	@Column(name = "EXT_28")
	private Long ext28;

	/**
	 * 类型29
	 */
	@Column(name = "EXT_29")
	private Long ext29;

	/**
	 * 类型30
	 */
	@Column(name = "EXT_30")
	private Long ext30;

	/**
	 * 类型31
	 */
	@Column(name = "EXT_31")
	private Long ext31;

	/**
	 * 类型32
	 */
	@Column(name = "EXT_32")
	private Long ext32;

	/**
	 * 类型33
	 */
	@Column(name = "EXT_33")
	private Long ext33;

	/**
	 * 类型34
	 */
	@Column(name = "EXT_34")
	private Long ext34;

	/**
	 * 类型35
	 */
	@Column(name = "EXT_35")
	private Long ext35;

	/**
	 * 类型36
	 */
	@Column(name = "EXT_36")
	private Long ext36;

	/**
	 * 类型37
	 */
	@Column(name = "EXT_37")
	private Long ext37;

	/**
	 * 类型38
	 */
	@Column(name = "EXT_38")
	private Long ext38;

	/**
	 * 类型39
	 */
	@Column(name = "EXT_39")
	private Long ext39;

	/**
	 * 类型40
	 */
	@Column(name = "EXT_40")
	private Long ext40;

	/**
	 * 类型41
	 */
	@Column(name = "EXT_41")
	private Long ext41;

	/**
	 * 类型42
	 */
	@Column(name = "EXT_42")
	private Long ext42;

	/**
	 * 类型43
	 */
	@Column(name = "EXT_43")
	private Long ext43;

	/**
	 * 类型44
	 */
	@Column(name = "EXT_44")
	private Long ext44;

	/**
	 * 类型45
	 */
	@Column(name = "EXT_45")
	private Long ext45;

	/**
	 * 类型46
	 */
	@Column(name = "EXT_46")
	private Long ext46;

	/**
	 * 类型47
	 */
	@Column(name = "EXT_47")
	private Long ext47;

	/**
	 * 类型48
	 */
	@Column(name = "EXT_48")
	private Long ext48;

	/**
	 * 类型49
	 */
	@Column(name = "EXT_49")
	private Long ext49;

	/**
	 * 类型50
	 */
	@Column(name = "EXT_50")
	private Long ext50;

	/**
	 * 排序字段
	 */
	@Column(name = "SORT")
	private Long sort;

}
