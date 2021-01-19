import accountBook from './createSub/accountBook'
import cert from './createSub/cert'
import certTmp from './createSub/certTmp'
import subject from './createSub/subject'
import certTmpInOut from './createSub/certTmpInOut'
import sysParam from './createSub/sysParam'
import certFile from './createSub/certFile'
import subBeg from './createSub/subBeg'
import certTmpCarry from './createSub/certTmpCarry'
import sign from './createSub/sign'
import contract from './createSub/contract'

// 账本模型
export const createAccountBook = accountBook.createAccountBook

// 基本参数模型
export const createSysParamInfoForm = sysParam.createSysParamInfoForm
// 历史凭证人员模型
export const createCertOperatorName = sysParam.createCertOperatorName

// 科目模型
export const createSubjectForm = subject.createSubjectForm

// 凭证归档模型
export const createCertFile = certFile.createCertFile

// 收入支出模型
export const createCertTmpInOut = certTmpInOut.createCertTmpInOut

// 第一版凭证模型
// 凭证详情模型
export const createCertPara = cert.createCertPara
// 凭证明细模型
export const createHsCertDtlPara = cert.createHsCertDtlPara
// 凭证辅助项模型
export const createHsCertDtlAst = cert.createHsCertDtlAst

// 第二版凭证模型
// 凭证详情模型
export const createCertForm = cert.createCertForm
// 凭证明细模型
export const createCertDtlForm = cert.createCertDtlForm
// 凭证辅助项模型
export const createCertAstForm = cert.createCertAstForm

// 凭证模板主信息
export const createHsCertTmpDataEntity = certTmp.createHsCertTmpDataEntity
// 凭证模板关联科目信息
export const createHsCertTmpSubEntity = certTmp.createHsCertTmpSubEntity
// 凭证模板凭证信息
export const createCertTmpParaVO = certTmp.createCertTmpParaVO
// 凭证模板凭证明细
export const createHsCertTmpDtlVO = certTmp.createHsCertTmpDtlVO
// 凭证模板辅助项
export const createCertAstVO = certTmp.createCertAstVO

// 第二版模板模型
export const createCertTmpForm = certTmp.createCertTmpForm
// 凭证模板凭证明细
export const createCertTmpDtlForm = certTmp.createCertTmpDtlForm
// 凭证模板辅助项
export const createCertTmpAstForm = certTmp.createCertTmpAstForm

// 科目期初模型
export const createSubBeg = subBeg.createSubBeg
// 科目期初辅助项模型
export const createAstDtl = subBeg.createAstDtl

// 结转模板
export const createHsCertTmpCarrySubEntityFin = certTmpCarry.createHsCertTmpCarrySubEntityFin
export const createHsCertTmpCarrySubEntityBudg = certTmpCarry.createHsCertTmpCarrySubEntityBudg
export const createCertTmpCarryToOneVO = certTmpCarry.createCertTmpCarryToOneVO
export const createCertTmpCarryAstVOBudg = certTmpCarry.createCertTmpCarryAstVOBudg
export const createCertTmpCarryAstVOFin = certTmpCarry.createCertTmpCarryAstVOFin
export const createCertTmpCarryToManyVO = certTmpCarry.createCertTmpCarryToManyVO
export const createCertTmpCarrySubToManyVOBudg = certTmpCarry.createCertTmpCarrySubToManyVOBudg
export const createCertTmpCarrySubToManyVOFin = certTmpCarry.createCertTmpCarrySubToManyVOFin
export const createCertTmpCarryAstVO = certTmpCarry.createCertTmpCarryAstVO

// 签报
export const createSignEntrty = sign.createSignEntrty
export const createSignDtlForm = sign.createSignDtlForm
export const createSingAttch = sign.createSingAttch
export const createSignEditForm = sign.createSignEditForm

// 合同
export const createContractBaseForm = contract.createContractBaseForm
export const createUnitInformationForm = contract.createUnitInformationForm
export const createSubjectMatterForm = contract.createSubjectMatterForm
export const createCollectionManagementForm = contract.createCollectionManagementForm
export const createExtFieldsForm = contract.createExtFieldsForm
export const createContractExtField = contract.createContractExtField
