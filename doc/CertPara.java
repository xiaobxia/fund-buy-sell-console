package src.main.biz.accounts.web.cert.entity.requestPara;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author liyuan
 * @date 2020-02-07
 */
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CertPara {


    @Id
    /**
     * 自增ID
     */
    @Column(name = "PHID")
    private Long phid;

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
     * 凭证年份
     */
    @Column(name = "CERT_YEAR")
    private Long certYear;

    /**
     * 会计期
     */
    @Column(name = "CERT_MONTH")
    private Long certMonth;

    /**
     * 凭证类型 1.现金2.银行3.转账
     */
    @Column(name = "CERT_TYPE")
    private Long certType;

    /**
     * 凭证号
     */
    @Column(name = "CERT_NO")
    private String certNo;

    /**
     * 凭证日期
     */
    @Column(name = "CERT_DATE")
    private LocalDateTime certDate;

    /**
     * 凭证分类，1.财务会计凭证2.预算会计凭证
     */
    @Column(name = "CERT_CATEGORY")
    private Long certCategory;

    /**
     * 附件数
     */
    @Column(name = "ATTACH_NUM")
    private Long attachNum;

    /**
     * 凭证来源（1凭证2冲红3更正4出纳）
     */
    @Column(name = "SOURCE")
    private Long source;

    /**
     * 出纳ID
     */
    @Column(name = "CASH_ID")
    private Long cashId;

    /**
     * 出纳名称
     */
    @Column(name = "CASH_NAME")
    private String cashName;

    /**
     * 审核人ID
     */
    @Column(name = "VERIFY_ID")
    private Long verifyId;

    /**
     * 审核人名称
     */
    @Column(name = "VERIFY_NAME")
    private String verifyName;

    /**
     * 审核1.待审核。2审核通过，3审核失败4.反审核中
     */
    @Column(name = "VERIFY_STATUS")
    private Long verifyStatus;

    /**
     * 审核日期
     */
    @Column(name = "VERIFY_DATE")
    private LocalDateTime verifyDate;

    /**
     * 财务主管ID
     */
    @Column(name = "CFO_ID")
    private Long cfoId;

    /**
     * 财务主管名称
     */
    @Column(name = "CFO_NAME")
    private String cfoName;

    /**
     * 制单ID
     */
    @Column(name = "CREAT_ID")
    private Long creatId;

    /**
     * 制单名称
     */
    @Column(name = "CREAT_NAME")
    private String creatName;

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
     * 业务日期
     */
    @Column(name = "BUSINESS_DATE")
    private LocalDateTime businessDate;

    /**
     * 冲红，更正关联凭证id
     */
    @Column(name = "CERT_PHID")
    private Long certPhid;

    /**
     * 结账标识：0：未月结 1：已月结
     */
    @Column(name = "CLOSE_LABEL")
    private Long closeLabel;


}
