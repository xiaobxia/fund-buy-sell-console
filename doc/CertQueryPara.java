package src.main.biz.accounts.web.cert.entity.requestPara;

import lombok.Data;
import src.main.biz.accounts.web.common.domain.PageQueryForm;

import java.time.LocalDateTime;

/**
 * @Description: 凭证多条件查询参数
 * @Author: Mr.Yuan
 * @Date: 2020/2/21 9:40
 * @Version 1.0
 */
@Data
public class CertQueryPara extends PageQueryForm {
    //    凭证类型
    private Long certType;
    //    审核状态
    private Long verifyStatus;
    //    科目id
    private Long subId;
    //    会计期间
    private Long year;
    private Long month;
    //    记账日期
    private LocalDateTime begCertDate;
    private LocalDateTime endCertDate;
    //    搜索条件（科目，凭证号，摘要）
    private String condition;
}
