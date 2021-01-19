package src.main.biz.accounts.web.common.pojo.cert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author liyuan
 * @date 2020-02-10
 */
@Data
@Entity
@Table(name = "HS_CERT_DTL")
@AllArgsConstructor
@NoArgsConstructor
public class HsCertDtl implements Serializable {

    private static final long serialVersionUID = 1659899545008954149L;
    @Id
    /**
     * 自增ID
     */
    @Column(name = "PHID")
    private Long phid;

    /**
     * 凭证ID
     */
    @Column(name = "CERT_ID")
    private Long certId;

    /**
     * 摘要
     */
    @Column(name = "DIGEST")
    private String digest;

    /**
     * 科目
     */
    @Column(name = "SUB_ID")
    private Long subId;

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
     * 外币汇率
     */
    @Column(name = "FOREIGN_RATE")
    private BigDecimal foreignRate;

    /**
     * 外币key
     */
    @Column(name = "FOREIGN_KEY")
    private String foreignKey;

    /**
     * 外币金额
     */
    @Column(name = "FOREIGN_MONEY")
    private BigDecimal foreignMoney;

    /**
     * 借(金额)
     */
    @Column(name = "DEBIT")
    private BigDecimal debit;

    /**
     * 贷(金额)
     */
    @Column(name = "LENDER")
    private BigDecimal lender;



    /**
     * 业务日期
     */
    @Column(name = "BUSINESS_DATE")
    private LocalDateTime businessDate;

    /**
     * 排序字段，数字从小到大排序
     */
    @Column(name = "SORT")
    private Long sort;

    /**
     * 创建者
     */
//	@Transient
    @Column(name = "CREATOR")
    private Long creator;

    /**
     * 差异项id
     */
    @Column(name = "CERT_DIF_ID")
    private Long certDifId;

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

   /* *
     * 凭证辅助核算
     */
    @OneToMany(mappedBy = "certDtlId")
    @OrderBy("SORT ASC")
//    @JoinColumn(name = "CERT_DTL_ID", referencedColumnName = "PHID")
    private List<HsCertDtlAst> hsCertDtlAstList;

    /**
     * 差异项
     */
    @OneToOne
    @JoinColumn(name = "CERT_DIF_ID" , referencedColumnName = "PHID",insertable = false,updatable = false)
    private HsCertDtlDif hsCertDtlDif;

}
