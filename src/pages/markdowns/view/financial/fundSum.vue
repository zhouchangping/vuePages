<template>
  <article-content :title="title" :time="time">
    <!-- 工具部分-->
    <div class="fund-sum">
      <div class="fund-total-loan">
        <div class="fund-list">
          <p>等额本息计算公式:〔贷款本金×月利率×(1+月利率)^还款月数〕÷〔(1+月利率)^还款月数-1</p>
          <p>等额本金计算公式：每月还款金额= (贷款本金÷ 还款月数)+(本金—已归还本金累计额)×每月利率</p>
        </div>
        <div class="fund-list">
          <p>等额本息：贷款金额：1670000</p>
          <p class="fund-total">等额本息每月应还： {{monthCash.toFixed(2)}}元</p>
          <div class="fund-list">
            <label>贷款金额：</label><input v-model="totalNumber" placeholder="贷款金额"/>
          </div>
          <div class="fund-list">
            <label>年华利率：</label><input v-model="yearRate" placeholder="年华利率"/>
          </div>
          <div class="fund-list">
            <label>贷款期限：</label><input v-model="totalYear" placeholder="贷款期限"/>
          </div>
          <div class="fund-list">
            <button class="fund-refresh" @click="dealTotal">计等额本息每月还款金额</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 基金刷新净值部分-->
    <div class="fund-sum">
      <button class="fund-refresh" @click="reFreshFund">刷新单位净值</button>
    </div>
    <!-- 基金净值部分-->
    <div class="fund-sum">
      <div class="fund-middle">
        <div class="fund-middle_conten">
          <div class="fund-item" v-for="(items, index) in fundsNowsInfo">
            <div class="fund-title"> <span>名称： </span>{{items.data.name}}</div>
            <p> <span>代号: </span>{{items.data.fundcode}}</p>
            <p> <span>净值日期: </span>{{items.data.jzrq}}</p>
            <p> <span>单位净值: </span>{{items.data.dwjz}}</p>
            <p> <span>估算净值: </span>{{items.data.gsz}}</p>
            <p class="fund-red" :class="[items.data.gszzl < 0 ?'fund-green':'']"><span>估值涨幅: </span>{{items.data.gszzl}}</p>
            <p> <span>估值时间: </span>{{items.data.gztime}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 投资总金额部分及单个股票基金按年月统计-->
    <div class="fund-sum">
      <!-- 投资总金额部分-->
      <div class="fund-left">
        <div class="fund-total">投资总金额：{{getAllSumToal()}}</div>
        <div class="fund-total">基金投资总金额：{{getAllFundSumToal()}}</div>
         <div class="fund-total">股票投资总金额：{{getAllSharesSumToal()}}</div>
        <!-- <div style="padding: 8px; font-size: 12px;" v-for="(items, index)  in fundLists.slice(0, fundsLength)">
          {{items.name}}-{{getEachFundSum(items)}}     <span style="color: #f08d49">{{Number(getEachFundSum(items) / getAllFundSumToal()*100).toFixed(2)+"%"}}</span>
        </div> -->
        <div style="border-bottom: 1px solid #000"></div>
        <div style="padding: 8px; font-size: 12px;" v-for="(items, index)  in fundLists">
          {{items.name}}-{{getEachFundSum(items)}}    <span style="color: #f08d49">{{Number(getEachFundSum(items) / getAllSharesSumToal()*100).toFixed(2)+"%"}}</span>
        </div>
      </div>
      <!-- 单个股票基金按年月统计-->
      <div class="fund-middle">
        <div class="fund-middle_conten">
          <div v-for="(items, index) in yearMothLists">
            <p class="fund-title"> {{items.name}}</p>
            <ul v-for="(item, i) in items.years">
              <div>
                <span>{{item.year}}年</span>       <span>{{item.total}}</span>
              </div>
              <li v-for="(list, ii) in item.lists">
                <span>{{list.moth}}</span>--<span>{{list.cashMothTotal}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 所有股票基金按年月统计-->
      <div class="fund-right">
        <div class="fund-right_conten">
          <p class="fund-title">年份及月份投资总金额：</p>
          <ul v-for="(lists, i) in listsYearMoth">
            <div>
              <span>{{lists.year}}</span> <span>{{lists.total}}</span>
            </div>
            <li v-for="(list, ii) in lists.lists">
              <span>{{list.moth}}</span>--<span>{{list.cashMothTotal}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--切换股票图表按钮部分-->
    <div class="fund-change">
      <div class="fund-item" v-for="(item, index) in funds">
        <button class="fund-button" :class="{'button-active': index===activeIndex}" @click="changeFund(index)">{{item}}</button>
      </div>
    </div>
    <!-- 股票基金图表展示部分-->
    <div class="fund-sum">
      <div class="fund-middle">
        <div id="myChart" :style="{ height: '400px'}"></div>
      </div>
    </div>
    <!-- 股票基金细节展示部分-->
    <div class="fund-content">
      <div class="fund-div">
        <div class="fund-lists" v-for="(items, index) in fundLists.slice(0, 8)" :key="index">
        <span style="color: #f08d49; margin-right: 20px;">{{items.name}}</span>      <span>{{getEachFundSum(items)}}</span>
        <div class="fund-list" v-for="(item, i) in items.lists" :key="i">
          <span style="margin-right: 300px;">{{item.time}}</span>                         <span>{{item.cash}}</span>
        </div>
      </div>
      </div>
      <div class="fund-div">
        <div class="fund-lists" v-for="(items, index) in fundLists.slice(8)" :key="index">
          <span style="color: #f08d49; margin-right: 20px;">{{items.name}}</span>      <span>{{getEachFundSum(items)}}</span>
          <div class="fund-list" v-for="(item, i) in items.lists" :key="i">
            <span style="margin-right: 300px;">{{item.time}}</span>                         <span>{{item.cash}}</span>
          </div>
        </div>
      </div>
    </div>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
import fundsListsNew from "./funds.js";
import goodsCompanys from "./fundGood.js";
import { jsonp, name, dealName } from '@/utils/jsonp.js'
export default {
  name: "news",
  data() {
      return {
        time: '2021-02-24',
        fundsCodes: ['004241', '006229', '180012'], // 获取当前基金的估值
        funds: ['博时黄金', '易方达裕祥回报债券', '中欧时代先锋股C', '中欧医疗创新股票C', '银华富裕主题混合', '南方沪深300ETF链接A'], 
        // fundsLength: 3,
        sharesLength: 2, //  股票数量
        title: "基金股票黄金列表汇总",
        // 曾今买过的
        endSharedList: [ 
          {
            name: "交易定期支付双息平衡混合", 
            code: '519732', 
            title: '太稳定，三个月不涨的基金',
            lists: [
              { time: '2021-03-05', cash: 1870 },
              { time: '2021-05-21', cash: -1870.49 },
            ]
          },
          { 
            name: "中欧新蓝筹灵活配置混合A", 
            code: '166002', 
            title: '连续几个月，都还没涨',
            lists: [
              { time: '2021-02-24', cash: 1000 }, 
              { time: '2021-03-04', cash: 300 }, 
              { time: '2021-03-14', cash: 100 }, 
              { time: '2021-03-19', cash: 100 }, 
              { time: '2021-03-31', cash: 200 }, 
              { time: '2021-04-07', cash: 50 },
              { time: '2021-04-09', cash: 200 }, 
              { time: '2021-04-12', cash: 300 }, 
              { time: '2021-04-15', cash: 200 }, 
              { time: '2021-05-13', cash: 100 },
              { time: '2021-06-28', cash: -2508 },
            ]
          },
          { 
            name: "兴全合润混合(LOF)", 
            code: '163406', 
            title: "买入公司平安，三一，判断暂时不在趋势，集中钱做其他的",
            lists: [
              { time: '2021-03-04', cash: 1000 }, 
              { time: '2021-03-08', cash: 200 }, 
              { time: '2021-03-25', cash: 200 }, 
              { time: '2021-03-31', cash: 100 },
              { time: '2021-04-08', cash: 100 }, 
              { time: '2021-04-12', cash: 100 }, 
              { time: '2021-04-15', cash: 300 }, 
              { time: '2021-05-06', cash: 100 }, 
              { time: '2021-05-07', cash: 100 },
              { time: '2021-07-07', cash: -2323, title: "买入公司平安，三一，判断暂时不在趋势，集中钱做其他的" },
            ]
          },
          { 
            name: "南方沪深300ETF链接A", 
            code: '202015', 
            title: "大盘横盘中",
            lists: [
              { time: '2021-02-24', cash: 1000 }, 
              { time: '2021-03-04', cash: 200 }, 
              { time: '2021-03-08', cash: 200 }, 
              { time: '2021-03-19', cash: 100 },
              { time: '2021-03-25', cash: 200 },
              { time: '2021-03-31', cash: 150 }, 
              { time: '2021-04-07', cash: 100 }, 
              { time: '2021-04-09', cash: 100 }, 
              { time: '2021-04-12', cash: 200 }, 
              { time: '2021-04-26', cash: 100 }, 
              { time: '2021-05-06', cash: 100 }, 
              { time: '2021-05-07', cash: 100 },
              { time: '2021-05-13', cash: 100 },
               { time: '2021-05-13', cash: -2630,  },
            ]
          },
          { 
            name: "易方达裕祥回报债券", 
            code: '002351', 
            title: '资金少，涨幅慢',
            lists: [
              { time: '2021-03-19', cash: 500 },
              { time: '2021-03-25', cash: 500 }, 
              { time: '2021-03-31', cash: 500 }, 
              { time: '2021-04-09', cash: 500 },
              { time: '2021-04-21', cash: 100 }, 
              { time: '2021-04-26', cash: 50 }, 
              { time: '2021-07-07', cash: -1798 },
            ]
          },
          { name: "博时黄金", code: '002611', lists: [
              { time: '2021-03-19', cash: 1000 },
              { time: '2021-03-26', cash: 2000 },
              { time: '2021-03-30', cash: 1000 },  
              { time: '2021-03-31', cash: 1000 }, 
              { time: '2021-04-12', cash: 300 }, 
              { time: '2021-04-20', cash: 500 }, 
              { time: '2021-04-26', cash: 500 }, 
              { time: '2021-04-28', cash: 300 },
              { time: '2021-06-04', cash: 1000 },
              { time: '2021-06-15', cash: 1000 },
              { time: '2021-07-06', cash: 539, item: 1.797 },
              { time: '2021-07-21', cash: -9722.72, title: "资金利用率太低" },
            ]
          },
          { name: "中欧时代先锋股C", code: '004241', lists: [
              { time: '2021-02-24', cash: 500 }, 
              { time: '2021-03-04', cash: 200 }, 
              { time: '2021-03-08', cash: 200 }, 
              { time: '2021-03-15', cash: 100 }, 
              { time: '2021-03-19', cash: 100 }, 
              { time: '2021-03-31', cash: 200 },
              { time: '2021-04-09', cash: 150 }, 
              { time: '2021-04-12', cash: 300 }, 
              { time: '2021-04-21', cash: 100 }, 
              { time: '2021-04-26', cash: 50 }, 
              { time: '2021-05-07', cash: 100 },
              { time: '2021-05-13', cash: 100 },
              { time: '2021-08-05', cash: -2451 },
            ]
          },
          { name: "中欧医疗创新股票C", code: '006229', lists: [
              { time: '2021-02-24', cash: 600 }, 
              { time: '2021-03-04', cash: 500 }, 
              { time: '2021-03-15', cash: 200 }, 
              { time: '2021-03-19', cash: 200 }, 
              { time: '2021-03-31', cash: 100 },
              { time: '2021-04-06', cash: 200 }, 
              { time: '2021-04-12', cash: 300 }, 
              { time: '2021-04-26', cash: 100 }, 
              { time: '2021-05-06', cash: 200 }, 
              { time: '2021-05-07', cash: 100 },
              { time: '2021-08-05', cash: -2254 },
            ]
          },
          { name: "银华富裕主题混合", code: '180012', lists: [
              { time: '2021-02-24', cash: 1000 }, 
              { time: '2021-03-04', cash: 200 }, 
              { time: '2021-03-08', cash: 100 }, 
              { time: '2021-03-15', cash: 100 },
              { time: '2021-03-19', cash: 200 },
              { time: '2021-03-25', cash: 150 },
              { time: '2021-03-31', cash: 100 }, 
              { time: '2021-04-06', cash: 100 },
              { time: '2021-04-07', cash: 100 }, 
              { time: '2021-04-09', cash: 200 }, 
              { time: '2021-04-12', cash: 200 }, 
              { time: '2021-04-26', cash: 150 },
              { time: '2021-05-06', cash: 200 }, 
              { time: '2021-05-07', cash: 100 },
              { time: '2021-08-05', cash: -2795 },
            ]
          },
          { 
            name: "华兰生物", 
            code: '002007', 
            inTime: '6天',
            endTime: '2021-06-10',
            title: '三天内，暂时没有确立低位，清仓',
            lists: [
              { time: '2021-06-04', cash: 3875 },
              { time: '2021-06-10', cash: -3830 },
            ]
          },
          { 
            name: "三花智控", 
            code: '002050', 
            buyNum: 2, // 重新买入一次
            sNum: 2, // 卖出次数
            inTime: '4天',
            endTime: '2021-06-15',
            title: '处于中间下跌途中，三天内，没有超过3.5%，连续下跌超过3.5%，没有上升迹象',
            lists: [
              { time: '2021-06-11', cash: 2170*2 },
              { time: '2021-06-15', cash: -2105*2 },
              { time: '2021-06-21', cash: 2065, title: "连续两个上涨，预估处于低位，三花已成为世界领先的OEM供应商， 三花牌制冷自控元器件已成为世界知名品牌之一，白色家具，新能源配件" },
              { time: '2021-06-24', cash: 6780, },
              { time: '2021-07-05', cash: -9192, title: '趋势上看走坏，连续四天下跌，为了保住利润--，后续有上涨迹象' },
            ]
          },
          { 
            name: "三一重工", 
            code: '600031', 
            inTime: '60天',
            endTime: '2021-06-15',
            title: '周期股，市场预期不好，散户太多，不在行情,横盘太久，持续下跌',
            lists: [
              { time: '2021-04-16', cash: 3175 },
              { time: '2021-04-30', cash: 3096 },
              { time: '2021-06-15', cash: -2780 },
              { time: '2021-06-15', cash: -2790 },
            ]
          },
          { 
            name: "新汽车", 
            code: '515030', 
            inTime: '8天',
            endTime: '2021-06-15',
            title: '上升区间，中途恐慌下跌2.8%，为保留收益，自我预测会下跌， 1.上升途中，错误操作，后续上涨，没扛住下跌',
            other: '卖飞了，没有扛住下跌趋势',
            lists: [
              { time: '2021-06-07', cash: 3706, each: 1.853 },
              { time: '2021-06-15', cash: -2000*1.895, each: 1.895 },
            ]
          },
          { 
            name: "口子窖", 
            code: '603589', 
            inTime: '8天',
            endTime: '2021-06-15',
            title: '波动厉害，下跌趋势，三线和二线酒之间，半道进，中途涨到7%，没舍得卖出。卖出时机错过，亏。后续持续上涨，买入时机不对，没扛住下跌，后续持续波动',
            lists: [
              { time: '2021-05-25', cash: 6538 },
              { time: '2021-06-15', cash: -6090 },
            ]
          },
          { 
            name: "杭州银行", 
            code: '600926', 
            title: '银行股为什么下跌?，逻辑是什么，不看好银行的愿意，近期抛出',
            other: '后续有回调到,银行股，涨跌太慢',
            endTime: '2021-06-21',
            lists: [
              { time: '2021-06-10', cash: 3140, item: 15.7 },
              { time: '2021-06-21', cash: -200*1.44 },
            ]
          },
          { 
            name: "中国平安", 
            code: '601318', 
            endTime: '2021-06-21',
            title: '金融改革，市场不看好，业绩可能低，喋喋不休，近期出局.买入时机不对，处于保险下跌趋势中',
            lists: [
              { time: '2021-05-06', cash: 7100 },
            ]
          },
          { 
            name: "闻泰科技", 
            code: '600745', 
            title: '判断上升趋势，突然出现3个点的下浮，看第二天，公司指标不是很突出，主要是为了赚趋势和半导体的趋势。商誉太高，负债一般，后续涨了，半导体行情带动',
            other: '后续有一次大涨，散户还是太多，卖飞',
            lists: [
              { time: '2021-06-16', cash: 9485 },
              { time: '2021-06-18', cash: 9865 },
              { time: '2021-06-22', cash: -9497, title: '波动预期会下行' },
              { time: '2021-06-25', cash: -9360, title: '波动预期会下行' },
            ]
          },
          { 
            name: "大华股份", 
            code: '002236', 
            title: '连续两个上涨，预估处于低位',
            other: '持续下跌，不在情绪',
            lists: [
              { time: '2021-06-21', cash: 2175 },
              { time: '2021-06-28', cash: 2137, title: '持续几天下行，与预期不一致，横盘和下行风险大'  },
            ]
          },
          { 
            name: "恒瑞药业", 
            code: '600276', 
            title: '医药，底部横盘，判断上升趋势，是否长期上升，公司好，前期涨幅过大，横盘中，存在下跌风险，确实下跌很多61',
            lists: [
              { time: '2021-06-11', cash: 7280 },
              { time: '2021-06-15', cash: 7245 },
              { time: '2021-06-25', cash: -6750 },
              { time: '2021-06-28', cash: -6780, title: '预估下行，还不稳定' },
            ]
          },
          { 
            name: "万科A", 
            title: '房地产打压，情绪不好，长期持有股，后续清仓，总结不要对下行趋势下的股票和风险系数加大的股票抱有希望，分红时间点要看好',
            lists: [
              { time: '2021-05-06', cash: 5585 },
              { time: '2021-05-11', cash: 2723 },
              { time: '2021-05-12', cash: 10825 },
              { time: '2021-05-13', cash: 2678 },
              { time: '2021-05-19', cash: 2688 },
              { time: '2021-05-21', cash: 5333 },
              { time: '2021-05-31', cash: 5331 },
              { time: '2021-06-04', cash: 7920 },
              { time: '2021-06-23', cash: -9760, title: '波动预期会下行,适当减仓，等待' },
              { time: '2021-06-25', cash: -4886, title: '波动预期会下行,适当减仓，等待' },
              { time: '2021-06-28', cash: 2448, title: '波动预期上行，失误，所以大趋势下判断上行买点，很难' },
              { time: '2021-06-28', cash: -4872, title: '波动预期会下行,适当减仓，等待' },
              { time: '2021-06-29', cash: -21600, title: '波动预期会下行,清仓' },
            ]
          },
          { 
            name: "长电科技", 
            code: '601100', 
            titleBuy: '横盘上行，预估会涨，缺点，散户太多，固定资产58.5%，应收账款太大，半导体，封测龙头',
            lists: [
              { time: '2021-07-06', cash: 7989, item: 39.89 },
              { time: '2021-07-14', cash: -7776, item: 38.88, item: '走势不好看，可能踏空，但是公司波动价格，散户太多，短期不看好' },
            ]
          },
          { 
            name: "中概互联",
            code: '513050', 
            buyNum: 2, // 买入次数
            sNum: 2, // 卖出次数
            titleBuy: '港股处于反垄断，预估还会涨，等==，考虑清仓，科技股受到压制',
            lists: [
              { time: '2021-04-15', cash: 1000 },
              { time: '2021-04-21', cash: 400 },
              { time: '2021-04-30', cash: 1018 },
              { time: '2021-05-06', cash: 798.6},
              { time: '2021-05-07', cash: 1966.3},
              { time: '2021-05-10', cash: 1146.5},
              { time: '2021-05-11', cash: 550.8},
              { time: '2021-05-13', cash: 750.2},
              { time: '2021-05-14', cash: 1463.4},
              { time: '2021-06-04', cash: 1535},
              { time: '2021-07-06', cash: -10556, title: '行情下跌，市场受到情绪，等待企稳后再来'},
              { time: '2021-07-15', cash: 5220, title: '预估行情上行，反垄断，阿里和腾讯和好'},
              { time: '2021-07-19', cash: 5101, item: '1.759', title: '滴滴事件，行业预估处于让利阶段，反垄断还在'},
            ]
          },
          { 
            name: "科创50etf", 
            code: '588000', 
            titleBuy: '科创板企业低估值，涨势好，考虑加仓',
            lists: [
              { time: '2021-06-07', cash: 4419 },
              { time: '2021-06-08', cash: 1465 },
              { time: '2021-07-06', cash: 2240, item: 1.600 },
              { time: '2021-07-15', cash: -8314, item: 1.599, title: '可能会涨，但是资金量小' },
            ]
          },
          { 
            name: "格力电器", 
            code: '000651', 
            titleBuy: '横盘下行很久，企业是个好企业，有上升迹象，预估上行，获得国际去甲醛空调奖',
            lists: [
              { time: '2021-07-19', cash: 5136 },
              { time: '2021-07-21', cash: -5076, title: '格力属于稳定股，目前景气度预判成长股' },
            ]
          },
          { 
            name: "恒立液压", 
            code: '601100', 
            titleBuy: '横盘下行很久，企业是个好企业，有上升迹象，预估上行， 工程机械整机与零部件的逻辑有很大的不同，整机销量下滑，意味着公司利润下滑，但是零部件不同，业务方向不是单一的，比如恒立液压下游包括汽车行业、农业机械、航空航天、新能源装备以及工业机器人',
            lists: [
              { time: '2021-06-29', cash: 8530 },
              { time: '2021-07-13', cash: 8900 },
              { time: '2021-07-16', cash: 9540 },
              { time: '2021-07-21', cash: 9660, title: "下跌太多，补仓，看好" },
              { time: '2021-07-26', cash: 9995, title: "下跌太多，补仓，看好,如果持续跌，跑，逻辑还没变" },
              { time: '2021-07-27', cash: -47670, item: "9534", title: "下跌太多，逻辑没变，大盘不稳定，避险" },
            ]
          },
          { 
            name: "福莱特", 
            code: '601865', 
            titleBuy: '业绩稳定，下跌是机会，表现符合预期，买入时买入量小，预期45%',
            lists: [
              { time: '2021-04-29', cash: 2628 },
              { time: '2021-05-06', cash: 2623 },
              { time: '2021-06-23', cash: 3768 },
              { time: '2021-06-25', cash: 3797 },
              { time: '2021-06-28', cash: 7360 },
              { time: '2021-07-09', cash: 8320, title: '看好光伏产业后续行情，装机量和并网要求' },
              { time: '2021-07-12', cash: 4100, title: '看好光伏产业后续行情，装机量和并网要求' },
              { time: '2021-07-14', cash: 15498, title: '短期情绪，看好后续，短期有一定风险' },
              { time: '2021-07-15', cash: -4000, title: '中途卖出用于交契税的钱' },
              { time: '2021-07-27', cash: 4251*2, title: '下跌太多补仓，后续才知道是外部环境变化了' },
              { time: '2021-07-27', cash: -48444, title: '后续才知道是外部环境变化了，避险,后面涨了' },
            ]
          },
          { 
            name: "法拉电子", 
            code: '600563', 
            titleBuy: '连续两个上涨，预估还有上涨，市盈率60，较高，薄膜电容器，新能源车',
            lists: [
              { time: '2021-06-22', cash: 14970 },
              { time: '2021-06-29', cash: 30663 },
              { time: '2021-07-27', cash: -181.480*300, title: '避险情绪，后续又买入，涨了，持有中' },
            ]
          },
          { 
            name: "通威股份", 
            code: '600438', 
            titleBuy: '太阳能，底部横盘，判断上升趋势，是否长期上升，公司好',
            lists: [
              { time: '2021-06-15', cash: 3595 },
              { time: '2021-06-25', cash: 3896 },
              { time: '2021-07-01', cash: 4450 },
              { time: '2021-07-15', cash: -11775, item: '39.25', title: '走势不好看，股性不好，硅料减价' },
              { time: '2021-08-05', cash: 50780, item: '50.78', title: '看好前景和形式'},
              { time: '2021-08-10', cash: 48230, item: '48.23', title: '波动中，创业板不如主板，科技能源，不知道对不对，也是中预判吧，买入后就跌，看上去不行'},
            ]
          },
          { 
            name: "正泰电器", 
            code: '601877', 
            titleBuy: '光伏储能一体化',
            lists: [
              { time: '2021-08-05', cash: 54450, item: '49.50', title: '走势，资料待查'},
              { time: '2021-08-18', cash: -54230, item: '49.30', title: '走势，看上去不好，强拉上来的，怕继续跌'},
            ]
          },
          { 
            name: "湖南黄金", 
            code: '002155', 
            titleBuy: '黄金矿',
            lists: [
              { time: '2021-08-18', cash: 3800, item: '11.20', title: '走势好，避险情绪？短期博弈'},
              { time: '2021-08-19', cash: 48184, item: '11.68', title: '走势好，板块内跌，它涨，强拉上来的，怕跌，落袋为安'},
            ]
          },
          { 
            name: "明阳智能", 
            code: '601615', 
            titleBuy: '风能，储能，看到上升趋势中，想赌一把，不太好的心态，公司是好公司',
            lists: [
              { time: '2021-07-27', cash: 19.70*2000,},
              { time: '2021-07-27', cash: 19.50*400,},
              { time: '2021-08-17', cash: -43680, title: '股东减持，情绪不好，短期规避，是否落袋为安需要提前落袋？避免盈利回调，后面又涨了，长期还是好的'},
            ]
          },
          { 
            name: "招商蛇口", 
            code: '001979', 
            titleBuy: '房地产',
            nowInfo: '目前低估值，不考虑动',
            lists: [
              { time: '2021-08-11', cash: 48528, item: '10.11', title: '看趋势，而且业绩挺好，低估值，安全'},
              { time: '2021-08-20', cash: -4800, item: '10.04', title: '房地产没有成长属性'},
            ]
          },
          { 
            name: "平安银行", 
            code: '000001', 
            titleBuy: '银行',
            nowInfo: '预估业绩好，希望赚点钱，也希望稳，可惜银行长期太稳定了，当然也安全，毕竟好公司',
            lists: [
              { time: '2021-08-20', cash: 19.89*1300, item: '19.89', title: '看趋势，而且业绩挺好，低估值，安全'},
              { time: '2021-08-20', cash: -19.29*1300, item: '19.89', title: '看趋势，而且业绩挺好，低估值，安全'},
            ]
          },
        ],
        // 基金股票部分
        fundLists: [
          // 基金部分
          // 股票部分
          { 
            name: "法拉电子", 
            code: '600563', 
            titleBuy: '连续两个上涨，预估还有上涨，市盈率60，较高，薄膜电容器，新能源车，光伏，长期来看是上升趋势',
            lists: [
              { time: '2021-07-27', cash: 184.310*300, title: '操作失误，不要在闪电买入，也不要太心急，以为会错失上升买点，宁可抄底不要追高，法拉一般不大可能一天涨五个点，所以。。。' },
              { time: '2021-07-27', cash: 180.500*300, title: '操作失误，不要在闪电买入，也不要太心急，以为会错失上升买点,如果还下跌，考虑卖出' },
              { time: '2021-08-05', cash: -183*300, title: '横盘，害怕下跌，减仓观望' },
               { time: '2021-08-05', cash: 202.950*100, title: '高位追，后续下跌了几天，长期看好，可能会有大的盘整了，哎，情绪。。。' },
            ]
          },
          { 
            name: "金风科技", 
            code: '002202', 
            titleBuy: '风电龙头，但是感觉股价一直萎靡不振，今年会不会突破呢？',
            lists: [
              { time: '2021-08-23', cash: 14.04*2900, title: '希望在低位接入，但是风电感觉很难涨，也许是个错误，先看看，一直不涨就卖了' },
              { time: '2021-08-23', cash: 13.98*2000, title: '希望在低位接入，但是风电感觉很难涨，也许是个错误，先看看，一直不涨就卖了' },
            ]
          },
        ],
        listsYearMoth: [ // 年月份统计
          // {
          //   "year": '2021', 'total': 10000, lists: [
          //     { 'moth': '2021-03', 'cashMothTotal': 3000}
          //   ]
          // }
        ],
        yearMothLists: [
          {
            "name": '易方达',
            'years': [
              {
                'year': 2021, 
                'total': 1000, 
                'lists': [
                  { 'moth': '2021-03', 'cashMothTotal': 3000}
                ]
              }
            ] 
          }
        ],
        fundsNowsInfo: [],
        activeIndex: 0,
        totalNumber: 1670000,
        yearRate: 5.45,
        totalYear: 30,
        monthCash: 0,
        goodsCompanys: goodsCompanys // 优秀公司
      }
  },
  created() {
    // this.getWechatDatas(); // 统计每只基金年月
    this.dealTotal() // 处理贷款，计算等额本息每月还款金额
    this.dealFundsNew(fundsListsNew); // 处理基金持股大于300的股票
    // this.getFundNow(); // 获取基金当前估值
    this.getYearData(); // 统计所有基金年月数据
    this.dealFundList(); // 处理生成基金数组
    this.getFundYearData(); // 统计每只基金年月
    this.shareNow();
    jsonp({
      url: 'http://49.235.238.235:3000/say',
      params: { wd: 'Iloveyou' },
      callback: 'show'
    }).then(data => {
      console.log(data)
    })
  },
  mounted() {
    dealName();
    console.log(name, "name---------")
    this.$nextTick(function() {
      this.drawLine(this.fundLists[0].lists)
    })
  },
  methods: {
    shareNow() {
      this.$axios({
        url: "http://www.zsxg.cn/api/v2/capital/realTime",
        method: "GET",
        params: {
          codes: '600309.SH'
        }
      }).then((res)=> {
        console.log(res)
      }).catch(function (err) {
        return err;
      });
    },
    dealTotal() {
      let monthRate = Number((this.yearRate/100/12).toFixed(5));
      this.monthCash = this.totalNumber * Number(monthRate * Math.pow((1+monthRate), this.totalYear*12)) / Number(Math.pow((1+monthRate), this.totalYear*12) -1 );
    },
    dealFundsNew(data) {
      let arr = data.filter(function(current) {
        return current['重复数'] > 99; 
      });
      console.log(arr)
    },
    getWechatDatas() {
      // this.$axios({
      //   url: "/getWechatDatas",
      //   method: "GET",
      // }).then((res)=> {
      //   console.log(res)
      // }).catch(function (err) {
      //   return err;
      // });
    },
    reFreshFund() {
      console.log(this.$toast)
      this.$toast({message: "刷新净值中", position: 'top'});
      // this.getFundNow();
    },
    getFundNow() {
      let that = this;
      let arrAxios = [];
      for (let i = 0; i < that.fundsCodes.length; i++) {
        arrAxios.push(that.$axios({
          url: "/getFundsValue"+`?code=${that.fundsCodes[i]}`,
          method: "GET",
        }).catch(function (err) {
          return err;
        }));
      }
      Promise.all(arrAxios).then((result)=> {
        that.fundsNowsInfo = [];
        result.map((v,index) => {
          console.log(v)
          if(v.isAxiosError){
            console.log('第' + (index+1) + '个请求失败')
          } else {
            that.fundsNowsInfo.push(v);
          }
        })
      }).catch((err)=> {
        console.log(err)
      }).finally(()=> {
        console.log(that.fundsNowsInfo)
      });
    },
    dealFundList() {
      let funds = [];
      for (let i = 0; i < this.fundLists.length; i++) {
        funds.push(this.fundLists[i].name);
      }
      this.funds = funds;
    },
    getYearData() {
      let yearDatas = [];
      let yearMap = new Map();
      let mothToalSumMap = new Map();
      for (let i = 0; i < this.fundLists.length; i++) {
        let fundData = this.fundLists[i].lists;
        for (let j = 0; j < fundData.length; j++) {
          const year = fundData[j].time.substring(0, 4);
          const mothLong = fundData[j].time.substring(0, 7);
          // let moth = fundData[j].time.substring(5, 7);
          if (yearMap.has(year)) { // 存在年
            if (mothToalSumMap.has(mothLong)) {
              let toalMoths = mothToalSumMap.get(mothLong)+fundData[j].cash;
              //  mothToalSumMap.delete(mothLong);
               mothToalSumMap.set(mothLong, toalMoths); // 设置这一个月总数
            } else {
              mothToalSumMap.set(mothLong, fundData[j].cash); // 设置这一个月总数
            }
          } else { // 不存在年
            yearMap.set(year, year); // 设置这一年
            if (mothToalSumMap.has(mothLong)) {
              let toalMoths = mothToalSumMap.get(mothLong)+fundData[j].cash;
              //  mothToalSumMap.delete(mothLong);
               mothToalSumMap.set(mothLong, toalMoths); // 设置这一个月总数
            } else {
              mothToalSumMap.set(mothLong, fundData[j].cash); // 设置这一个月总数
            }
          }
        }
      }
      for (let keyYear of yearMap.keys()) {
        let yearList = {};
        yearList.year = keyYear;
        yearList.lists = [];
        for (let keyMoth of mothToalSumMap.keys()) {
          let keySlice = keyMoth.substring(0, 4);
          if (keySlice === keyYear) {
            let mothCash = {};
            mothCash.moth = keyMoth;
            mothCash.cashMothTotal = mothToalSumMap.get(keyMoth);
            yearList.lists.push(mothCash);
          }
        }
        yearList.total = yearList.lists.reduce(function (totals, current) {
          return parseInt(totals + current.cashMothTotal);
        }, 0)
         yearDatas.push(yearList);
         this.listsYearMoth = yearDatas;
      }
    },
    getFundYearData() {
      let fundsArr = [];
      for( let i = 0; i < this.funds.length; i++) {
        let fundsObjs = {};
        fundsObjs.name = this.funds[i];
        fundsObjs.years = this.getDatasFund(this.funds[i]);
        fundsArr.push(fundsObjs);
      }
     this.yearMothLists = fundsArr;
    },
    getDatasFund(name) {
      let yearDatas = [];
      let yearMap = new Map();
      let mothToalSumMap = new Map();
      for (let i = 0; i < this.fundLists.length; i++) {
        let fundData = this.fundLists[i].lists;
        let fundName = this.fundLists[i].name;
        if (fundName === name) {
          for (let j = 0; j < fundData.length; j++) {
            const year = fundData[j].time.substring(0, 4);
            const mothLong = fundData[j].time.substring(0, 7);
            // let moth = fundData[j].time.substring(5, 7);
            if (yearMap.has(year)) { // 存在年
              if (mothToalSumMap.has(mothLong)) {
                let toalMoths = parseInt(Number(mothToalSumMap.get(mothLong)+fundData[j].cash));
                mothToalSumMap.set(mothLong, toalMoths); // 设置这一个月总数
              } else {
                mothToalSumMap.set(mothLong, Number(fundData[j].cash)); // 设置这一个月总数
              }
            } else { // 不存在年
              yearMap.set(year, year); // 设置这一年
              if (mothToalSumMap.has(mothLong)) {
                let toalMoths = parseInt(mothToalSumMap.get(mothLong)+Number(fundData[j].cash));
                //  mothToalSumMap.delete(mothLong);
                mothToalSumMap.set(mothLong, toalMoths); // 设置这一个月总数
              } else {
                mothToalSumMap.set(mothLong, Number(fundData[j].cash)); // 设置这一个月总数
              }
            }
          }
        }
      }
      for (let keyYear of yearMap.keys()) {
        let yearList = {};
        yearList.year = keyYear;
        yearList.lists = [];
        for (let keyMoth of mothToalSumMap.keys()) {
          let keySlice = keyMoth.substring(0, 4);
          if (keySlice === keyYear) {
            let mothCash = {};
            mothCash.moth = keyMoth;
            mothCash.cashMothTotal = mothToalSumMap.get(keyMoth);
            yearList.lists.push(mothCash);
          }
        }
        yearList.total = yearList.lists.reduce(function (totals, current) {
          return totals + current.cashMothTotal;
        }, 0)
         yearDatas.push(yearList);
      }
      return yearDatas;
    },
    changeFund(index) { // 改变基金生成canvas
      this.activeIndex = index;
      this.drawLine(this.fundLists[index]['lists']);
    },
    getEachFundSum(items) { // 获取单个基金总金额
      let sum = 0;
      let lists = items.lists;
      for (let i = 0; i < lists.length; i++) {
        sum+=lists[i].cash;
      }
      return sum;
    },
    getAllSumToal() { // 获取所有投资总金额
      let sum = 0;
      for (let i = 0; i < this.fundLists.length; i++) {
        sum+= this.getEachFundSum(this.fundLists[i])
      }
      return sum;
    },
    getAllSharesSumToal() { // 获取所有股票总金额
      let sum = 0;
      let length = this.fundLists.length;
      console.log(length)
      for (let i = 0; i < this.sharesLength; i++) {
        sum+= this.getEachFundSum(this.fundLists[length - i - 1])
      }
      return sum;
    },
    getAllFundSumToal() { // 获取所有基金总金额
      let sum = 0;
      let length = this.fundLists.length - this.sharesLength;
      for (let i = 0; i < length; i++) {
        sum+= this.getEachFundSum(this.fundLists[i])
      }
      return sum;
    },
    dealDatas(datas) { // 处理canvas所需数据
      let xData = [];
      let yData = [];
      for (let i = 0; i < datas.length; i++) {
        xData.push(datas[i].time);
        yData.push(datas[i].cash);
      }
      return {
        xData: xData,
        yData: yData
      }
    },
    drawLine(datas) { // 绘制canvas
      const resultObj = this.dealDatas(datas)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var option;
      option = {
          xAxis: {
              type: 'category',
              data: resultObj.xData
          },
          yAxis: {
              type: 'value'
          },
          tooltip: {
            rigger: 'axis'
          },
          series: [{
              data: resultObj.yData,
              type: 'line',
              smooth: true
          }]
      };
      option && myChart.setOption(option);
    }
  },
  components: {
    ArticleContent,
  }
}
</script>
<style lang="scss" scoped>
.fund-sum {
  display: flex;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f08d49;
}
.fund-sum 
.fund-sum .fund-left {
  width: 200px;
}
.fund-sum .fund-middle {
  flex: 1;
}

.fund-sum .fund-refresh {
  outline: 0;
  border: none;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  flex: 1;
  box-sizing: border-box;
  margin-top: 5px;
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 20px;
  margin-right: 3px;
  background: #f08d49;
  max-width: 100px;
  text-align: center;
}
.fund-refresh:hover {
  background: #42b983;
  color: #fff;
}

.fund-middle_conten {
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.fund-middle_conten  div {
  flex: 1;
  margin-bottom: 20px;
}

.fund-middle_conten  .fund-red {
  color: red;
}

.fund-middle_conten  .fund-green {
  color: green;
}

.fund-sum .fund-right {
  width: 200px;
}

.fund-right_conten {
  padding: 0 10px;
}

.fund-title {
  width: 200px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #f08d49;
  font-size: 16px;
  font-weight: 500;
}

.fund-total {
  color: #f08d49;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
}

.fund-content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.fund-div {
  flex: 1;
  margin-top: 100px;
}

.fund-lists {
  margin-top: 20px;
}

.fund-list {
  box-sizing: border-box;
  padding: 5px;
  line-height: 20px;
}

.fund-change {
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.fund-change .fund-button {
  outline: 0;
  border: none;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  flex: 1;
  box-sizing: border-box;
  margin-top: 5px;
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 20px;
  margin-right: 3px;
  background: #f08d49;
  max-width: 100px;
  text-align: center;
}
.fund-change .button-active {
  background: #42b983;
  color: #fff;
}
ul li{
  text-indent: 5px;
}
</style>