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
 * @date 2020-02-18
 */
@Data
@Entity
@Table(name = "HS_CERT_DTL_DIF")
@AllArgsConstructor
@NoArgsConstructor
public class HsCertDtlDif implements Serializable {

    private static final long serialVersionUID = 8073340798850408489L;
    @Id
    /**
     * 主键ID
     */
    @Column(name = "PHID")
    private Long phid;

    /**
     * 凭证明细ID
     */
    @Column(name = "CERT_DTL_ID")
    private Long certDtlId;

    /**
     * 差异项ID
     */
    @Column(name = "DIFF_ITEM_ID")
    private Long diffItemId;

    /**
     * 财务科目类别
     */
    @Column(name = "FIN_SUB_CATE")
    private String finSubCate;

    /**
     * 财务科目
     */
    @Column(name = "FIN_SUB")
    private Long finSub;

    /**
     * 财务借方
     */
    @Column(name = "FIN_DEBIT")
    private BigDecimal finDebit;

    /**
     * 财务贷方
     */
    @Column(name = "FIN_LENDER")
    private BigDecimal finLender;

    /**
     * 预算科目类别
     */
    @Column(name = "BUDG_SUB_CATE")
    private String budgSubCate;

    /**
     * 预算科目
     */
    @Column(name = "BUDG_SUB")
    private Long budgSub;

    /**
     * 预算借方
     */
    @Column(name = "BUDG_DEBIT")
    private BigDecimal budgDebit;

    /**
     * 预算贷方
     */
    @Column(name = "BUDG_LENDER")
    private BigDecimal budgLender;

    /**
     * 差异分类
     */
    @Column(name = "DIFF_CATE")
    private String diffCate;

    /**
     * 差异项选择
     */
    @Column(name = "DIFF_ITEM")
    private String diffItem;

    /**
     * 差异金额（金额）
     */
    @Column(name = "DIFF_MONEY")
    private BigDecimal diffMoney;

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


/*    @OneToOne
    @JoinColumn(name = "CERT_DTL_ID", referencedColumnName = "PHID",insertable = false,updatable = false)
    private HsCertDtl hsCertDtl;*/
}
