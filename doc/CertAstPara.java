package src.main.biz.accounts.web.cert.entity.requestPara;

import lombok.Data;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * @Description:
 * @Author: Mr.Yuan
 * @Date: 2020/2/13 13:09
 * @Version 1.0
 */
@Data
public class CertAstPara {
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
     * 排序字段
     */
    @Column(name = "SORT")
    private Long sort;

    //    辅助核算
    Map<String, Long> astMap;
}