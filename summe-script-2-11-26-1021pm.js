// GLOBAL VARIABLES //

// LOG DEBUG SWITCHES //

const dev = true, dbg = false, dCl = false;

// CACHED API KEY //

var __OPNAI_KEY;

// REGEX PATTERNS //

var A_APL = /(?!^)(?:appl[iy]|submitt|complet|updat|chang)(?:ed|ing)/i;
var A_AVL = /ready|available|here|inside|enclosed|attached|monthly/i;
var A_CFM = /(?:confirm|plac)(?:ed|ing|ation)|(?:appli|plac)ed|summary/i;
var A_CMG = /on (?:the|its) way|coming|sent|\bscheduled|arriv(?:es|ing)|getting your \w+? order ready/i;
var A_CMP = /(?!^)(?:done|(?:finish|execut|process|complet)ed?)/i;
var A_CNL = /cancel(?:ed|ing)/i;
var A_DCL = /declined|failed|returned|insufficient funds|nsf|unsuccessful|needs attention|(?:update|change|re[- ]?try) your payment (?:method|details|card)|action required|suspend(?:ed|ing|)/i;
var A_DLV = /delivered|dropped off|details of|arrived/i;
var A_DND = /(?:reject|den(?:i|y))(?:ed|ing)|sorry|unfortunately/i;
var A_DUE = /due|time (?:to|for)|soon/i;
var A_NEW = /new|received|replied|for\syou/i;
var A_PRA = /(?:(?:(?:pcn[- ]|)(?:com|arriv)(?:ing|al))|(?:\bscheduled for|will be) deliver(?:ed|y))(?: soon|today|)/i;
var A_PSD = /sent|process|issu(?:ed|ing)/;
var A_PUP = /ready (?:for|to) pick[ \-]?up|(?:re|)[\- ]?filled/i;
var A_REC = /received|thank(?:s|\syou)\sfor|in (?:prog|proc)ess|processing/i;
var A_RFD = /refund(?:ed|ing)?/i;
var A_RFL = /time\s?to|re[ \-]?fill|ready(?:\s?to\s?order|)/i;
var A_RNW = /renew(?:ed|ing|)/i;
var A_RSD = /reschedul|postpon(?:e|ed)|delay(?:ed|)/i;
var A_SCD = /scheduled|auto(?:matic|[\s\-]?pay)|ach|withdrawal/i;
var A_SNT = /sent|(?:heading your|(?:on|making) (?:the|its) way)|(?:initiat|start|creat|submitt?)(?:ed|ing)/i;
var A_SPD = /shipped|track(?:ing|e)|(?:heading|on|making) (?:the|its|your|to) (?:way|you)|sent|(?:e|i)n route?/i;
var A_UPD = /updated|new|revised|change[sd]|notice|annual/i;
var A_VER = /[M2]FA|temporary|sec(?:ure|urity|rtn)|(?:authent|verif|identif)ication|(?:one|\d+|single)[\- ](?:digit|time|use)/i;
var APT_A = /new|(?:reschedul|postpon|delay|updat)(?:e|ed)/i;
var APT_T = /app(?:t|ointment)\.?|interview|meet(?:ing)/i;
var AZ_AMZ = /amazon/i;
var AZ_DCL = /Payment declined:/;
var AZ_DLV = /Delivered:/;
var AZ_ODR = /Ordered:/;
var AZ_SPD = /Shipped:/;
var CL_AD2 = /^[\w+\. ],? [A-Z]{2},? [\d\-]{5,10}$/;
var CL_AD = /\b(?:S(?:[Tt][Ee]?|tree|ui)t?e?|A[Vv][Ee]?(?:nue)?|R(?:oa)?[Dd]|D[Rr](?:ive)?|B(?:ou)?[Ll]?e?[Vv](?:ar)?[Dd]|H(?:igh)?[Ww]a?[Yy]|Way|La?[Nn]e?|C(?:our)?[Tt]|Pi?[Kk]e?|C[Ii][Rr](?:cle)?|(?:T|P[Ll]a?)(?:ERR?|err?|[Cc][Ee]?)?|(?:P\.? *[Oo]\.? *)?[Bb](?:OX|ox) *\d+|A[Pp](?:ar)?[Tt](?:ment)?|Fl(?:oor)?|Unit)\.?\b/;
var CL_AFT = /-->|<!?--|→|^\s*>\s*$|\[[^\[\]]+?\]|\b96\b|=\s?\d\s?\?|ADVERTISEMENT|SPONSOR(?:ED|)|\|\n|\s*\*{2,}\s*|image\svia.*?$|##[\d\w]+##|[A-Z_]{5,}:\s*(True|False|None|Null|[0-9]+)/gm;
var CL_CPS = /[\t ]+/g;
var CL_DSH = /^[-=]+$/gm;
var CL_FR = /unsubscribe|(?:no\s*longer|)\s*(?:would|want|wish|need)\s*(?:like\s*|)(?:stop|change)\s*(?:show\syou|to|your\ssubcription)\s*(?:receive?(?:ing)?|(?:be\s*|)removed|remove\s*yourself)|advertise\s*(?:on|with)/i;
var CL_FRB = /(?:(?:mem|subsci|read)b?er|pay)[\s\-](?:only|(?:wall|support)ed)|(?:pledg|donat)(?:ing|e|ion)\b|(?:keep|continue|read|view|see)\s(?:more|full\sstory|reading)|(?:you(?:\sare|[’']re)\scurrently)|(?:become?(?:ing)?\s*an?\s*(?:free\s*(?:or\s*(?:paid|paying))?|(?:[\w\p{P} ]+))?\s*(?:member|subscriber\b))|buy\sme\sa\scoffee|support\s(?:us|me|(?:our|my)\swork)|(?:for\saccess|if\syou).*?\supgrade\b|add\s*(?:your)?\spostal\saddress\shere|web\s*version/ui;
var CL_FRC = /(?:did\snot|didn[’']t)\s(?:authorize|atpt|req|grant|access|allow|make)|\bdo\snot\s(?:respond|reply)|no[-\s]reply|(?:not\s|un)(?:monitor|attend)ed|void\swhere\sprohibited|no\scash\svalue|not\scombinable|(?:about|check\sout|connect|download|chat|reach\sout)\s?(?:with|the|our|to|)\s?(?:new\s|)(?:us|help|support|(?:mobile\s|)app\b|web[ -]?(?:site|page))|free\s(?:trial|membership|subscription|month|post|article|account|sample|gift)|(?:secure|change|reset|(?:re|)view|manage|adjust|modify|update|\bedit)\s(?:your|the|my|)\s?(?:account|communications?|notifications?|subscription|membership|profile|security|password|(?:email\s|)preferences?|settings|options|activity)|(?:you\s*(?:[’']ve|have|are|)\s*(?:(?:receiv|got)(?:ed|ing))|forwarded|was\s*(?:this|these)\s*(?:electronic\smessage\s|)(?:email|message|notification|notice|transmission|communication)s?\s*(?:because|is|was|(?:may\s*|)contains?|forwarded\sto\syou|in\serror))|offer\s(?:only|)\s?valid|not\scombinable|cannot\sbe\scombined|fees\s(?:may|)\s?apply|use\sthereof|terms\s(?:of|and|&)\s(?:use|sale|conditions)|(?:privacy|confidentiality)\s*(?:and|&)?\s*(?:policy|notice|statement|practices|(?:and|&)\ssecurity)|(named|intended)\s*(?:(?:only\s)?for|recipient|to\s*be(?:\s*for|))/i;
var CL_HFF = /forward(?:ed|)\sthis\s(?:to\syou|)\s?(?:message|email|post|newsletter|article)/i;
var CL_HR = /(?:view|read|see|open)\s(?:this|)\s?(?:email|post|article|message|web|in)\s?(?:[oi]n|as|)\s?(?:the|a|)[\s\-](?:line|app|web|version|browser)|web\s*version/i;
var CL_JSN = /```$/;
var CL_LKI = /\[([\w \p{P}]+?)\]\((?:https?:\/\/|mailto:|\??utm_)[\w\d\p{P}\s=]+?\)/gui;
var CL_LKP = /(?:^[\w ]+:\s*|)([\(\[<])\s*(?:(?:a|link)\s\w+="|)https?:\/\/[^\1\2]+?\s*([>\]\)])/gim;
var CL_LKS = /https?:\/\/[^<>\]\(\s]+?(?:([<\s])|$)/gim;
var CL_LLN = /(?!\b\d{1,2}\.\s)(?:©|[Cc]opyright|\(c\)|\u{00A9}|(?:[Rr]egistered\s*)?(?:[Ss]ervice\s*|[Tt]rade)mark|™|\u{2122}|not\s*affiliated|[Rr]ights\s[Rr]eserved|[Dd]isclosures?|[Rr]estrictions\sapply|Our\s[Mm]ailing\s[Aa]ddress\s[Ii]s|Careers|Questions\?|Start\swriting|Sent\svia|\BPowered\sby|Upgrade\sto\spaid|[Cc]lick\shere|(?:Contact|Follow)\s[Uu]s|Disclaimer)/u;
var CL_OPT = /opt[\-\s]out/gi;
var CL_SJ = /^\s*(re|fwd?)\s*:\s*/i;
var CL_SC = /Facebook|TikTok|Threads|Instagram|Bluesky|Reddit|Linkedin|Discord|Twitter|\bX\b|YouTube/i;
var CL_SC2 = /Share|Like|Heart|Restack|Comment|Forward/;
var CL_SDR = /([\w ]+ from )/i;
var CL_TSC = /(<\/?\b(?:br|table|tr|th|tbody|thead|td|li|figure|figcaption|button|p|div|h\d|ol|ul|li|p|div|h\d|ul|li|ol)\b\s*[^>]*?\s*\/?>)/gi;
var CL_TGS = / +([\/;"]?) *>/g;
var CL_UDD = /[\u{2013}\u{2212}\u{00AD}]/gu;
var CL_UDL = /[\p{Zp}\u{000A}\u{000d}\u{0085}\u{2028}\u{2029}\u{0000}-\u{0018}\u{001A}-\u{001F}]/gu;
var CL_UDS = /[\p{Zs}\f\u{2000}-\u{200A}\u{2007}\u{00A0}\u{0340}\u{00AD}\u{0340}\u{0020}\u{202F}]/gu;
var CL_UDZ = /[\u{2060}\u{FEFF}\u{200B}-\u{200F}\u{034F}\u{0019}]/gu;
var D_AMP = /%26/g, D_ANY = /&#x([0-9A-Fa-f]+);?/g, D_NU = /&#(\d+);?/g, D_QPB = /=\r?\n/g, D_QPC = /=([0-9A-F]{2})/g;
var F_CML = /([a-z0-9]),\s+([a-z0-9])/g;
var F_ERX = /([\|\+\*\.\?\^\$\{\}\(\)\[\]\/\\])/g;
var F_PRD = /⭕/g;
var F_TGL = /<([^<>\n\r]*?)[\n\r]+>/g;
var F_TGY = /(<\w+) *[\n\r]+ *(style.*?>)/g;
var M_JSN = /^```(?:json)?\s*/i;
var M_LBS = /[\n\r]+/g;
var M_LI = /(<li[^>]*?>([\S\s]+?)<\/li>)/g;
var M_NOP = /your\semail\ssoftware\scan't\sdisplay\sHTML\semails|this\sis\s(?:a|the)\s.*?\stemplate/i;
var M_NAT = /logo|badge|custom|icon|_|\.[a-z]{3,4}/i;
var M_PDA = /(?:\b(S[Tt]?[Ee]?|A[VvPp][EeTt]?|R[Dd]|B(?:lvd|LVD)|H[Ww][Yy]|L[NnTt][Dd]?|C[TtIi][Rr]?|T[EeCc][RrEe]|P[LlKk]?|O|F[Ll]|I[Nn][Cc]|C[Oo]|N|E|W))\.(\s*)/gm;
var M_PDE = /(\w+@\w+)\.([a-z]{2,4})/gm;
var M_PDN = /((?:^|[>\s])\d{1,2})\.( +)/gm;
var M_SCH = /font-size:\s*calc\(([\d[a-zA-Z%]+)\s*-\s*\1\)/gi;
var M_SEN = /^([^<]+)</;
var M_SEO = /<([^<]+)>|(\w+@\w+\.\w{3})/;
var M_SEQ = /"([^\"]+)"\s*<\/?[^>]*?>/;
var M_SLT = /(?:class\saction|legal)\ssettlement/i;
var M_TBK = /<((?:[^<>]+?[\n\r]+[^<>]+?)+[\n\r]*?\/?)>/g;
var M_TKN = /[a-z]{4,}/g;
var P_ACN = /[\S\s]*?/;
var P_ACR = /[\S\s]+?/;
var P_AC1 = /(.*?)/;
var P_ALB = /[\n\r]/g;
var P_ALR = /[A-Za-z]/;
var P_ATG = /<[^!]\/?[^>]*?>/g;
var P_BDO = /(?<!<(?:h\d|ol|ul|li)[^>]*?>)<(?:strong|\bb\b|(?!h\d|ul|ol|li)(?<tag>\w+)\s*[^<>]*?style=[^<>]*?font-weight:\s*(?:bold|[6-9]00);?)[^>]*?>/i;
var P_BL = /[\+\-#○■\*‣•—·•]/;
var P_CMI = /[^<>\-!]+?/;
var P_DCD = /(?: |%)/;
var P_DSH = /-{0,2}/;
var P_DTP = /!DOCTYPE/i;
var P_EJ = /(?![®©™])[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
var P_EML = /[\w@\.\-_\s<>\/\\"=:]+/;
var P_LB = /\n/g;
var P_LS = /[\n\r>]/;
var P_LE = /[\n\r<]/;
var P_LRN = /[A-Za-z0-9]/g;
var P_MD = /[\*_]/;
var P_MDH = /#{1,3}.*?(?:\s*\w|#{1,3})/g;
var P_NTG = /[^<>]*?/;
var P_PCT = /[,:\?!@\(\);<>\/\\=\|]/;
var P_SEQ = /\s*=\s*/;
var P_STB = /[ \t]*/;
var P_TCC = /<\/\1>/;
var P_TSX = /[^>\/]*?>/;
var P_ULL = /[A-Z][a-z]/;
var P_WS = /\s*/;
var S_GHH = /(?:&nbsp;(?:\s*|&nbsp;)*){2,}/;
var S_HF = /(\.\s+|\n+)/;
var S_UWD = /\b\w+\b/g;
var S_WS = /\s+/g;
var T_APL = /appl(?:ication\b|ied|ying)|resume/i;
var T_APT = /app(?:t|ointment)\.?|interview|meet(?:ing)/i;
var T_BIL = /bill\b|invoice|charges?/i;
var T_CDE = /code|OTP/i;
var T_CHG = /(?:account|profile|preferences?|information)\s(?:chang(?:s|d)|update(?:s|d))/i;
var T_DLV = /delivery/i;
var T_DMR = /terms\s(?:of|and|&)\s(?:use|sale|conditions)|(?:privacy|confidentiality)\s*(?:and|&)?\s*(?:policy|notice|statement|practices|(?:and|&)\ssecurity)/i;
var T_MSG = /message|\bdm\b|\bim\b|conversation|reply|text|voicemail/i;
var T_ODR = /order(?:ed|ing|)|your (?:no-contact |)delivery|purchase/i;
var T_PCN = /prescription|medication|phrm/i;
var T_PKG = /package|shipment|driver/i;
var T_PMT = /payment\b|fee\b|withdrawal|(?:money|funds|cash) transfer|bank|ach (?:authorization|payment|transfer)/i;
var T_PYT = /payout|distribution|payment\d|money|cash|transfer|earnings|deposit(?:ed|ing|)/i;
var T_RCT = /receipt/i;
var T_REQ = /request/i;
var T_RFD = /refund/i;
var T_RTN = /return/i;
var T_SBM = /submission/i;
var T_SCN = /subscri(?:bing|bed|ption)/i;
var T_SMT = /statement|(?:order|payment|account) (?:history|summary)/i;
var T_TNS = /transaction|deposit|transfer|request/i;

// STRINGS //

var CL_CLB = new RegExp(`(?:${P_STB.source}${P_ALB.source})+${P_STB.source}|[ \\t]{8,}`, `g`);
var CL_CMT = new RegExp(`<!(?${P_DTP.source})${P_DSH.source} *\\[?${P_CMI.source}\\]? *${P_DSH.source}>${P_DSH.source}>?|\\/\\*\\[?${P_CMI.source}\\*\\/|^ *${P_CMI.source} *-{2}>$`, `gim`)
var CL_DTY = new RegExp(`<${P_WS.source}${P_DTP.source}${P_NTG.source}>`, `i`);
var CL_XBT = new RegExp(`(${P_ATG.source})>`, `g`);
var CL_HDN = new RegExp(`<(?<tag>(?!br)\\w+)${P_WS.source}${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:${P_WS.source}transparent|display:${P_WS.source}none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):${P_WS.source}(?:0|calc\(?<pct>[\\d[a-zA-Z%]+)${P_WS.source}-${P_WS.source}\\k<pct>\\)|mso-hide:${P_WS.source}all|visibility:${P_WS.source}hidden))${P_TSX.source}${P_NTG.source}<\\/\\k<tag>>`, `gi`);
var CL_HDS = new RegExp(`<(?<tag>\\w+)${P_WS.source}${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:\\s?transparent|display:${P_WS.source}none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):${P_WS.source}(?:0|calc(?<pct>[\\d[a-zA-Z%]+)${P_WS.source}-${P_WS.source}\\k<pct>\\)|mso-hide:\\s?all|visibility:\\s?hidden))${P_NTG.source} ?\\/>`, `gi`);
var CL_MD = new RegExp(`${P_MD.source}{1,3}([\\S\\s]+?)${P_MD.source}{1,3}`, `g`);
var CL_MBD = new RegExp(`${P_MD.source}{2}${P_AC1.source}${P_MD.source}{2}`, `g`);
var CL_MBT = new RegExp(`${P_MD.source}{3}${P_AC1.source}${P_MD.source}{3}`, `g`);
var CL_MIT = new RegExp(`${P_MD.source}${P_AC1.source}${P_MD.source}`, `g`);
var CL_MSK = new RegExp(`~~${P_AC1.source}~~`, "g");
var CL_PVS = new RegExp(`(${P_LS.source})(?:(?:(?:(?:On\\s${P_ULL.source}{1,5},\\s${P_ULL.source}{1,5}\\s\\d{1,2},\\s\\d{4},?\\s(?:at\\s)?\\d{1,2}:\\d{2}\\s[AP]M,?\\s${P_EML.source}\\swrote${P_WS.source})|(?:(?:(?:Begin\\s|${P_WS.source}-{2,10}${P_WS.source})[Ff]orwarded|[Oo]riginal)\\s[Mm]essage))(?:${P_WS.source}-{2,6}${P_WS.source}|:))|(?:${P_BDO.source}|)From${P_WS.source}${P_EML.source})${P_LE.source}${P_ACN.source}$`);
var CL_TFG = new RegExp(`<(figure|figcaption)${P_TSX.source}${P_ACN.source}${P_TCC.source}`, `gi`);
var CL_TFR = new RegExp(`fr-original-style${P_SEQ.source}"[^">]*(?:"[^">]*"[^">]*)*"`, `gi`);
var CL_TDE = new RegExp(`${P_WS.source}<\\/?td${P_TSX.source}${P_WS.source}(?:<\\/?td${P_TSX.source})?${P_WS.source}(?<ej1>${P_WS.source}(?:${P_EJ.source}|${P_BL.source}))${P_WS.source}<\\/?td${P_TSX.source}${P_WS.source}(?:<\\/?td${P_TSX.source})?${P_WS.source}`, `gui`);
var CL_TDT = new RegExp (`<\\/?td${P_TSX.source}`, `gui`);
var D_LB = new RegExp(`(?:\\r|${CL_UDL.source})`, `gu`);
var D_LTR = new RegExp(`&(${P_ALR.source}${P_LRN.source}+);?`, `g`);
var D_MD = new RegExp(`${P_DCD.source}?96`, `g`);
var F_CMS = new RegExp(`(${P_ALR.source}),(${P_ALR.source})`, `g`);
var F_NU = new RegExp(`([0-9]{1,2}\\.)${P_WS.source}${P_ALB.source}+${P_WS.source}(${P_ALR.source})`, `g`);
var F_PNC = new RegExp(`(${P_ALR.source}+)\\s+([\\.!\\?,])`, `g`);
var F_SBP = new RegExp(`<\\b(sub|sup)\\b${P_TSX.source}(${P_NTG.source})${P_TCC.source}`, `gi`);
var F_TSP = new RegExp(`(<\\/?${P_NTG.source})${P_WS.source}(${P_ALB.source}+${P_WS.source}>)`, `gi`);
var M_IGA = new RegExp(`<img${P_NTG.source}alt${P_SEQ.source}"([\\w\\p{P} ]+?)"\\s*${P_NTG.source}>`, `gui`);
var M_LBL = new RegExp(`<ul${P_TSX.source}(${P_ACR.source})<\\/ul>`, `gi`);
var M_LNU = new RegExp(`<ol${P_TSX.source}(${P_ACR.source})<\\/ol>`, `gi`);
var M_OPC = new RegExp(`^${P_PCT.source}+$`);
var M_OTG = new RegExp(`^(?:<\\/?${P_NTG.source}>)+$`);

// FONTS //

var blkbry = `<font color="#200055">`, rsbry = `<font color="#3f00ab">`, stwbry = `<font color="#ff0060">`, cFnt = `</font>`;

// MESSAGES //

var errOpAi = `${rsbry}OpenAI encountered an error. Please try again later.${cFnt}`;
var fBt = `🗑️ ${stwbry}This message is full of junk and can't be summarized without timing out. Sorry about that.${cFnt}`;
var fHscm = `🛑 FILTER: 🚨 SCAM! 🚨 (SNEAKY HIDDEN TEXT) 🚨 🛑`;
var fNC = `${rsbry}It looks like this message has no content. I'll just take a little nap until the next one. 😴${cFnt}`;
var fScm = `${stwbry}🚨 <b>STOP!! 🚨<br /><em>This email is likely a scam!</em><br /></b>(Contains hidden "dummy" text)<br />🔻 <b>DON'T</b> click any links.<br /><b>🔻 DON'T</b> open any attachments.<br />🔻 <b>REPORT</b> the email to your provider.<br />🔻 <b>DELETE </b> the email immediately.${cFnt}`;
var fSz = `${stwbry}This email is too large to process without timing out. Try another one.${cFnt}`;
var fWc = `${rsbry}By the time you finish reading this sentence, you could have already read that email, so just read it.${cFnt}`;
var fNCT = `${rsbry}The top message in this thread is too short to summarize. Try another one.`;
var lBl = `\n   - `;
var lNoCn = `🛑 FILTER: NO CONTENT`;
var lNoP = `🛑 FILTER: NO PLAIN TEXT - USING HTML 🛑`;
var lScm = `🛑 FILTER: 🚨 SCAM! 🚨 (DISSIMILAR) 🚨 🛑`;
var lWc = `🛑 FILTER: LOW WORD COUNT - SKIPPING SUMMARY`;
var rW = `WORD COUNT <= 150`;
var rW34 = `WORD COUNT < 1/3 or 1/4`;
var rNC = `WORD COUNT < 5`;

// FUNCTIONS //

// HELPER FUNCTIONS //

function escRx(txt) { return txt.replace(F_ERX, "\\$1"); };
function lIx(ptn) { return ptn.lastIndex = 0; };
function lCs(char) { return char.toLowerCase(); };
function uCs(char) { return char.toUpperCase(); };
function rd2(num) { return Number(num.toFixed(2)); };
function toPct(num) { return rd2((num * 100)); };
function clM(src) { return src.map(m => escRx(m).trim()).join('|'); };
function cWds(str) { const text = str.trim(); return text.split(S_WS).filter(Boolean).length; };
function clps(text) { return String(text || "").replace(CL_CPS, " ").replace(CL_CLB, "\n").trim(); };
function nNl(v) { if (v === "undefined" || v === "" || v === null || !v) { return true; } else { return false; }; };

function cUqWds(txt) {
  let cmn = 0; txt = lCs(txt);
  const uq = new Set(), wds = txt.match(S_UWD);
  if (!wds) { return 0; };
  wds.forEach(wd => {
    if (wd.length < 5) { cmn++; } else { uq.add(wd); };
  });
  return cmn + uq.size;
}

function ckLg(lb, dta, size = 4000) {
  let c = 0;
  if (nNl(dta)) { return; };
  const text = (typeof dta === 'object') ? JSON.stringify(dta, null, 2) : String(dta);
  const tl = Math.ceil(text.length / size);
  for (let i = 0; i < text.length; i += size) {
    c++; console.log(`${lb} CHUNK ${c} of ${tl}:\n${text.substring(i, i + size)}`);
  }
}

function rgxRdc(out, chks, clL) {
  if (clL === "HTML" || clL === "Plain Text") {
    chks.forEach(([p, r, l]) => {
      out = (r === "f") ? p(out) : out.replace(p, r);
      if (dCl) { ckLg(`🐞🐞 AFTER ${clL} ${l} 🐞🐞`, clps(out)); };
    });
  } else {
    chks.forEach(([p, r]) => { out = (r === "f") ? p(out) : out.replace(p, r); });
  }
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} rgxRdc 🆗`) };
  return out;
}

function cToC(n) { if (!Number.isFinite(n)) { return ""; }; try { return String.fromCodePoint(n); } catch (e) { return ""; }; };

function dMg(src) {
  const ENT = {
    amp: "&", apos: "'", bull: "•", copy: "©", gt: ">", hellip: "…", laquo: "«", lsquo: "'", ldquo: '"', lt: "<",
    mdash: "—", middot: "·", nbsp: " ", ndash: "-", newline: "\n", ntilde: "ñ", ordm: "°", quot: '"', raquo: "»",
    rarr: "→", reg: "®", rsaquo: "›", rsquo: "'", rdquo: '"', shy: "", times: "×", trade: "™", zwnj: ""
  },
  RGX1 = [ [D_QPB, ""], [D_QPC, "%$1"] ],
  RGX2 = [
    [D_ANY, (_, hex) => cToC(parseInt(hex, 16))],    [D_NU, (_, dec) => cToC(parseInt(dec, 10))],
    [D_LTR, (m, name) => (name in ENT ? ENT[name] : m)], [D_AMP, "&"], [D_LB, "\n"], [D_MD, "—"]
  ]
  let out = String(src || "");
  const clL = "Decode Message";
  if (D_QPC.test(out)) {
    out = rgxRdc(out, RGX1, clL);
    try { out = decodeURIComponent(out); } catch (e) { out; };
  }
  out = rgxRdc(out, RGX2, clL);
  if (dbg) { console.log(`🆗 COMPLETED: dMg 🆗`); };
  return out;
}

function fxTgs(src) {
  let match;
  const wdC = cWds(src);
  for (let i = 0; i < wdC; i++) {
    while ((match = M_TBK.exec(src)) !== null) {
      src = src.replace((new RegExp(`${escRx(match[0])}`)), (match[0].replace(M_LBS, " ")));
    }
  }
  src = src.replace(CL_TGS, "$1>");
  return src;
}

function clHdSty(html) {
  const tgs = [
    { o: '<head', c: '</head>', l: 7 },
    { o: '<style', c: '</style>', l: 8 }
  ];
  tgs.forEach(tg => {
    const lcH = lCs(html);
    let res = '', i = 0;
    while (i < html.length) {
      const st = lcH.indexOf(tg.o, i), nd = lcH.indexOf(tg.c, st);
      if (st === -1) { res += html.slice(i); break; };
      res += html.slice(i, st);
      if (nd === -1) { res += html.slice(st); break; };
      i = nd + tg.l;
    }
    html = res;
  });
  return html;
}

function clIgA(src) {
  let txt = String(src || ""), ig;
  while ((ig = M_IGA.exec(txt)) !== null) {
    const alt = ig[1] || "", notAlt = M_NAT.test(alt),
    sp = / /.test(alt), p = new RegExp(`${escRx(ig[0])}`);
    if (alt.length > 3 && !notAlt && sp) {
      txt = txt.replace(p, `${alt}`);
    } else {
      txt = txt.replace(p, "");
    }
  }
  return txt;
}

function cvtLst(txt) {
  let nL, bL;
  while ((nL = M_LNU.exec(txt)) !== null) {
    for (let i = 0; i < nL[1].length;) {
      const nLi = M_LI.exec(nL[1]);
      if (nNl(nLi)) { continue; } else if (nLi) {
        const nLiPtn = new RegExp(`${escRx(nLi[1])}`);
        i++; txt = txt.replace(nLiPtn, `${i}. ${nLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  while ((bL = M_LBL.exec(txt)) !== null) {
    lIx(M_LI);
    for (let j = 0; j < bL[1].length;) {
      const bLi = M_LI.exec(bL[1]);
      if (nNl(bLi)) { break; } else if (bLi) {
        const bLiPtn = new RegExp(`${escRx(bLi[1])}`);
        j++; txt = txt.replace(bLiPtn, `• ${bLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  return txt;
}

function fxPnc(out) {
  const ptns = [
    [F_PNC, "$1$2"],     [F_NU, "$1 $2"],
    [F_CMS, "$1, $2"], [F_CML, "$1, $2"]
  ];
  const clL = "Fix Punctuation"; out = rgxRdc(out, ptns, clL);
  return out;
}

function clPLnk(rawP, wdC) {
  let pLnk;
  for (let i = 0; i < wdC; i++) {
    while ((pLnk = CL_LKI.exec(rawP)) !== null) {
      if (!M_NAT.test(pLnk[1])) {
        const pLp = new RegExp(`${escRx(pLnk[0]) || ""}`);
        rawP = rawP.replace(pLp, `${pLnk[1]}`);
      }
    }
  }
  return rawP;
}

function clHCn(html, clL) {
  let out = String(html || "");
  const isTh = CL_PVS.test(out);
  if (isTh) { out = out.replace(CL_PVS, "$1") };
  const chks = [
    [fxTgs, "f", "fxTgs"],          [cvtLst, "f", "cvtLst"],             [clIgA, "f", "clIgA"],
    [P_EJ, "", "P_EJ"],             [CL_TSC, "\n\n", "CL_TSC"],    [CL_HDN, "", "CL_HDN"],
    [CL_HDS, "", "CL_HDS"],   [clHdSty, "f", "clHdSty"],           [CL_UDZ, "", "CL_UDZ"],
    [CL_UDS, " ", "CL_UDS"],    [CL_UDD, "-", "CL_UDD"],       [CL_UDL, "\n", "CL_UDL"],
    [F_SBP, " ($2) ", "F_SBP"],     [F_TGY, "$1 $2", "F_TGY"],     [clIgA, "f", "clIgA"],
    [CL_CMT, "", "CL_CMT"],         [CL_TDE, "$<ej1> ", "CL_TDE"], [CL_TDT, "$1$2", "CL_TDT"],
    [CL_TFR, "", "CL_TFR"],     [CL_TFG, "\n", "CL_TFG"],      [F_TSP, "$1$2", "F_TSP"],
    [P_ATG, "", "P_ATG"],     [F_TGL, "<$1>", "F_TGL"],      [CL_AFT, "", "CL_AFT"],
    [CL_LKS, "$1", "CL_LKS"], [CL_DSH, "", "CL_DSH"],              [CL_XBT, "$1", "CL_XBT"],
    [fxPnc, "f", "fxPnc"]
  ];
  out = rgxRdc(out, chks, clL); out = clps(out);
  if (dbg) { console.log(`🆗 COMPLETED: clHCn 🆗`); };
  return { out: out, isTh: isTh };
}

function clPCn(plain, clL) {
  let out = String(plain || ""); const isTp = CL_PVS.test(out);
  if (isTp) { out = out.replace(CL_PVS, "$1") };
  const chks = [
    [P_ATG, "", "P_ATG"],     [CL_UDZ, "", "CL_UDZ"],   [CL_UDS, " ", "CL_UDS"],
    [CL_UDD, "-", "CL_UDD"],  [CL_UDL, "\n", "CL_UDL"], [CL_CMT, "", "CL_CMT"],
    [CL_LKP, "", "CL_LKP"],   [F_PNC, "$1$2", "F_PNC"], [CL_MD, "$1", "CL_MD"],
    [CL_AFT, "", "CL_AFT"],   [F_NU, "$1 $2", "F_NU"],  [CL_LKS, "$1", "CL_LKS"],
    [CL_DSH, "", "CL_DSH"],   [CL_MIT, "$1", "CL_MIT"], [CL_MBD, "$1", "CL_MBD"],
    [CL_MBT, "$1", "CL_MBT"], [CL_MSK, "$1", "CL_MSK"], [P_MDH, "", "P_MDH"]
  ];
  out = rgxRdc(out, chks, clL); const pWC = cWds(out); out = clPLnk(out, pWC); out = clps(out);
  if (dbg) { console.log(`🆗 COMPLETED: clPCn 🆗`); };
  return { out: out, isTp: isTp };
}

function sHF(txt) {
  const ps = [M_PDA, M_PDN, M_PDE];
  ps.forEach(p => txt = txt.replace(p, "$1⭕$2"));
  let cks = txt.split(S_HF), out = [];
  for (let i = 0; i < cks.length; i += 2) {
    let t = cks[i] ?? "", sp = cks[i + 1] ?? "";
    if (t === "" && sp === "") { continue; };
    out.push([t, sp]);
  }
  return out;
}

function jHF(cks) { let jd = ""; for (let i = 0; i < cks.length; i++) { jd += cks[i][0] + cks[i][1]; }; return jd; };

function clHrFr(src, stl) {
  let text = src.trim();
  const lns = sHF(text).filter(ln => !M_OTG.test(ln[0])).filter(ln => !M_OPC.test(ln[0])),
  noLs = lns.length, hEd = Math.min((noLs * 0.3), noLs), fSt = Math.max(hEd,noLs-(noLs * 0.6)),
  bdy = jHF(lns.slice(hEd, fSt)).replace(F_PRD, "."), hFr = jHF(lns.slice(fSt));
  let hdr = lns.slice(0, hEd), ftr = lns.slice(fSt);
  hdr = hdr.map(ln => [ln[0].replace(P_ATG, "").replace(F_PRD, "."), ln[1]]);
  ftr = ftr.map(ln => [ln[0].replace(P_ATG, "").replace(F_PRD, "."), ln[1]]);
  const wdC = cWds(jHF(hdr) + `\n` + bdy +`\n` + jHF(ftr));
  if (dev) { console.log(`📐 PRECLEAN WORD COUNT: ${wdC}\n\n📐 LINES: ${noLs}`); };
  if (wdC < 30) { return { text, hFr: "" }; };
  if (hdr.some(ln => CL_HR.test(ln[0]))) {
    if (dev) {
      console.log(`🗣️ HEADER MATCH(ES) 🗣️:\n${hdr.filter(ln => CL_HR.test(ln[0]))}`);
    }
    hdr = hdr.filter(ln => !CL_HR.test(ln[0]));
  }
  hdr = jHF(hdr); let lLns, fLns;
  if (ftr.length >= 20) {
    lLns = ftr.slice(-15); fLns = ftr.slice(0, -15);
  } else {
    lLns = ftr.slice(-8); fLns = ftr.slice(0, -8);
  }
  const lLn = lLns[lLns.length - 1],
  addM1 = (lLns.map(ln => ln[0].match(CL_AD))).filter(Boolean),
    addM2 = (lLns.map(ln => ln[0].match(CL_AD2))).filter(Boolean);
    if (addM1 || addM2) {
      for (let i = 0; i < lLns.length; i++) {
        const aLn1 = lLns[i] || [] || [], aLn2 = lLns[i + 1] || [] || [],
      aLn3 = lLns[i + 2] || [] || [], mA1 = CL_AD.exec(aLn1[0] || []),
      mA2 = CL_AD2.exec(aLn2[0] || []) || CL_AD.exec(aLn2[0] || []),
      mA3 = CL_AD2.exec(aLn3[0] || []) || CL_AD.exec(aLn3[0] || []);
      if (nNl(aLn1) || !mA1) { continue; };
        if (mA1) {
          if (dev) {
            console.log(`🏠 ADDRESS MATCH(ES): ${lBl}${mA1}` + (mA2 ? `${lBl}${mA2}` : '') + (mA3 ? `${lBl}${mA3}` : ''));
          }
          if (mA2) {
          if (mA3) { lLns.splice(i,3); } else if (!mA3 || aLn2 === lLn) { lLns.splice(i,2); };
          } else { lLns.splice(i); };
      } else if ((!mA2 && !mA3) || aLn1 === lLn) { lLns.splice(i); };
      }
    }
  let cS = false;
    for (let j = 0; j < lLns.length; j++) {
      const l1 = (String(lLns[j]).trim()).split(S_WS),
      l2 = (String(lLns[j + 1]).trim()).split(S_WS),
      sM1 = l1.filter(w => CL_SC.test(w)),  sM2 = l2.filter(w => CL_SC.test(w)),
      iM1 = l1.filter(w => CL_SC2.test(w)), iM2 = l2.filter(w => CL_SC2.test(w));
      if (l1.length === 0 && l2.length === 0) { break; };
      const t = { s1: sM1.length > 0, i1: iM1.length > 0, s2: sM2.length > 0, i2: iM2.length > 0 };
    if (dev) {
      if (t.s1) { console.log(`🌐 SOCIAL MATCH(ES) 🌐:${lBl}${sM1}` + (t.s2 ? `${lBl}${sM2}` : ``)); };
      if (t.i1) { console.log(`🌐 INTERACTION MATCH(ES) 🌐:${lBl}${iM1}` + (t.i2 ? `${lBl}${iM2}` : ``)); };
        }
    if (((t.s1 || t.i1) && (t.s2 || t.i2)) || sM1.length > 1 || iM1.length > 1) { cS = true; break; };
      }
    const ps = [CL_SC, CL_SC2];
  if (cS) { ps.forEach(p => { lLns = lLns.filter(ln => !p.test(ln[0])); }); };
    if (lLns.some(ln => CL_LLN.test(ln[0]))) {
      if (dev) {
        console.log(`🔚 LAST LINES MATCH(ES) 🔚:\n${lLns.filter(ln => CL_LLN.test(ln[0]))}`);
      }
      lLns = lLns.filter(ln => !CL_LLN.test(ln[0]));
    }
    if (!stl) { lLns = lLns.map(ln => [ln[0].replace(CL_OPT, ""), ln[1]]); };
  ftr = (nNl(lLns)) ? fLns : fLns.concat(lLns);
  const sF = jHF(ftr), fPtns = [CL_FR, CL_FRB, CL_FRC, CL_HFF];
    fPtns.forEach(ptn => {
      if (ftr.some(ln => ptn.test(ln[0]))) {
        if (dev) { console.log(`👣 FOOTER MATCHES 👣:\n${ftr.filter(ln => ptn.test(ln[0]))}`); };
        ftr = ftr.filter(ln => !ptn.test(ln[0]));
      }
    });
  ftr = jHF(ftr);
  const prndWc = cWds(hdr + `\n` + bdy + `\n` + ftr);
  if (dev) { console.log(`📐 PRUNED WORD COUNT: ${prndWc}`); };
  if (prndWc <= (wdC / 4)) {
    if (dev) { console.log(`🛑 FILTER: OVER-PRUNED (USING SAFE FOOTER) 🛑`); };
    ftr = sF;
  }
  const clL = "Clean Header/Footer";
  text = clps((hdr + `\n` + bdy + `\n` + ftr), clL);
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} clHrFr 🆗`); };
  return text;
}

function clSdr(sdr) {
  sdr = String(sdr || "unknown").trim();
  const qtdNm = sdr.match(M_SEQ), emlOnlyM = sdr.match(M_SEO),
  emlOnly = emlOnlyM?.[1] || emlOnlyM?.[2];
  let name = sdr.match(M_SEN);
  if (name?.[1]) {
    name = name[1].replace(/"/g, '') || "";
    name = CL_SDR.test(sdr) ? name.replace(CL_SDR, "") : name;
  }
  const chks = [
    { chk: name, sdr: name }, { chk: emlOnly, sdr: emlOnly }, { chk: qtdNm?.[1], sdr: qtdNm }
  ], mch = chks.find(c => c.chk);
  sdr = mch?.chk ? mch.sdr : sdr;
  if (dbg) { console.log(`🆗 COMPLETED: sdr 🆗`); };
  return sdr;
}

function clSmy(src) {
  let out = String(src || ""), isH = false, isP = false;
  const RGX = [
    [CL_MBT, "<strong><em>$1</em><strong>"], [CL_MSK, "<s>$1</s>"],
    [CL_MIT, "<em>$1</em>"],                 [CL_MBD, "<strong>$1<strong>"], 
  ];
  out = rgxRdc(src, RGX, isH, isP);
  if (dbg) { console.log(`🆗 COMPLETED: clSmy 🆗`); };
  return out;
}

// FILTERS //

function wcF(wdC) { return wdC <= 150; };

function cnF(clH, clP, mpH, isT) {
  let h = true, p = true, f = null, v, a, r;
  const hWc = cWds(clH), pWc = cWds(clP), h4 = hWc < (pWc / 4), p3 = pWc < (hWc / 3),
  pTp = M_NOP.exec(clP), nH = (nNl(clH) || hWc <= 5), nP = (nNl(clP) || pWc <= 5),
  lbD = rd2(pWc / clP.split("\n").length), noN = ((lbD > 40) || !P_ALB.test(clP));
  if (dev) {
    console.log(`📐 HTML WORD COUNT: ${hWc}\n📐 PLAIN WORD COUNT: ${pWc}\n\n🧱 PLAIN TEXT LINE BREAK DENSITY: ${lbD}`);
  }
  if (nH && nP) {
    f = isT ? fNCT : fNC;
    r = isT ? `TOP MESSAGE <= 5 WORDS` : rNC;
    if (dev) { `🛑 FILTER: NO CONTENT ${r}` };
    return { h: false, p: false, f }
  }
  if (h4 || nH) { h = false; v = "HTML"; };
  if (p3 || nP || mpH || pTp || noN) { p = false; v = "PLAIN TEXT"; };
  const rr = [
    { t: (nH || nP), r: rNC },
    { t: (h4 || p3), r: rW34 },
    { t: mpH, r: "MISPLACED HTML" },
    { t: pTp, r: `PLACEHOLDER/TEMPLATE (${pTp})` },
    { t: noN, r: `LINE BREAK DENSITY (${lbD})` }
  ];
  const rt = rr.find(t => t); if (rt) { r = rt.r };
  if (h4 || p3) { a = h4 ? "PLAIN TEXT" : "HTML"; };
  if (!h && !p) { f = isT ? fNCT : fNC; };
  if (dev && (!h || !p)) {
    console.log(`🛑 FILTER: ` + (v ? v : 'NO CONTENT') + ` ${r} ` + (a ? a : '') + `- SKIPPING SCAM CHECK 🛑`);
  }
  return { h, p, f };
}

function szF(src, trshld, lb) {
  const text = String(src || "");
  let unt = "B", mgS = text.length;
  const bMg = (mgS > trshld) ? true : false,
  kb = 1048576, mb = 1024, mgKb = mgS / kb, mgMb = mgS / mb;
  if (mgS > kb) { mgS = mgS > mb ? mgMb : mgKb; unt = mgS > mb ? "MB" : "KB"; };
  mgS = rd2(mgS);
  if (dev) { if (bMg) {
      console.log(`🛑 FILTER: ${lb} SIZE (${mgS} ${unt}) 🛑`);
    } else { console.log(`📐 ${lb} SIZE: ${mgS} ${unt}`); };
  }
  return bMg;
}

function btF(raw) {
  raw = raw.replace(CL_CMT, "");
  const chks = [
    { chk: raw.split(S_GHH).length > 20, rn: `👻 GHOST HEADER` },
    { chk: ((raw.split("<").length - 1) / raw.length) > 0.25, rn: `🏷️ TAG DENSITY` },
    { chk: raw.split("mso]").length > 10, rn: `🔭 OUTLOOK TAGS` }
  ];
  const mch = chks.find(c => c.chk);
  if (mch) { if (dev) { console.log(`🛑 FILTER: BLOATED - ${mch.rn} 🛑`); }; return true; };
  return false;
}

function dcScm(clH, clP) {
  let scm = false, hMCn = 0, pMCn = 0;
  const gtTkn = (text) => new Set(lCs(String(text || "")).match(M_TKN) || []),
  hTkn = gtTkn(clH), pTkn = gtTkn(clP);
  hTkn.forEach(token => { if (pTkn.has(token)) hMCn++; });
  pTkn.forEach(token => { if (hTkn.has(token)) pMCn++; });
  const hSim = hTkn.size ? (hMCn / hTkn.size) : 0,
  pSim = pTkn.size ? (pMCn / pTkn.size) : 0;
  if (hSim < 0.4 && pSim < 0.4) { scm = true; };
  if (dev) {
    console.log(`📐 HTML > PLAIN SIMILARITY: ${toPct(hSim)}%\n\n📐 PLAIN > HTML SIMILARITY: ${toPct(pSim)}%`);
  }
  return scm;
}

function ckTx(text, maxLength) {
  const s = String(text || ""), cks = [];
  let srt = 0, N = s.length;
  while (srt < N) {
    let end = Math.min(srt + maxLength, N);
    const pce = s.slice(srt, end).trim();
    if (end < N) { let ws = s.lastIndexOf(" ", end - 1);
    if (ws <= srt) ws = end; end = ws; };
    if (pce) cks.push(pce); srt = end + 1;
  }
  return cks;
}

function subjHt(subj) {
  let stl = false; const stlmt = M_SLT.exec(subj);
  if (stlmt) {
    stl = true; if (dev) { console.log(`💵 SETTLEMENT MATCH: ${stlmt}`); };
  }
  const SBJ_A = [
    { ptn: A_APL, act: "applied" }, { ptn: A_AVL, act: "available" }, { ptn: A_CFM, act: "confirmed" }, { ptn: A_CMG, act: "on the way" },
    { ptn: A_CMP, act: "complete" }, { ptn: A_CNL, act: "canceled" }, { ptn: A_DCL, act: "declined" }, { ptn: A_DLV, act: "delivered" },
    { ptn: A_DND, act: "denied" }, { ptn: A_DUE, act: "due" }, { ptn: A_NEW, act: "new" }, { ptn: A_PRA, act: "arriving soon" },
    { ptn: A_PSD, act: "processed" }, { ptn: A_PUP, act: "ready for pickup" }, { ptn: A_REC, act: "received" }, { ptn: A_RFD, act: "refunded" },
    { ptn: A_RFL, act: "ready to refill" }, { ptn: A_RNW, act: "renewed" }, { ptn: A_RSD, act: "rescheduled" }, { ptn: A_SNT, act: "sent" },
    { ptn: A_SCD, act: "scheduled" }, { ptn: A_SPD, act: "shipped" }, { ptn: A_UPD, act: "updated" }, { ptn: A_VER, act: "ready to use" }
  ];
  const SBJ_T = [
    { ptn: T_APL, thg: "application" }, { ptn: T_APT, thg: "appointment" }, { ptn: T_BIL, thg: "bill" }, { ptn: T_CDE, thg: "code" },
    { ptn: T_CHG, thg: "changes" }, { ptn: T_DLV, thg: "delivery" }, { ptn: T_DMR, thg: "terms" }, { ptn: T_MSG, thg: "message" },
    { ptn: T_ODR, thg: "order" }, { ptn: T_PCN, thg: "prescription" }, { ptn: T_PKG, thg: "package" }, { ptn: T_PMT, thg: "payment" },
    { ptn: T_PYT, thg: "payout" }, { ptn: T_RCT, thg: "receipt" }, { ptn: T_REQ, thg: "request" }, { ptn: T_RFD, thg: "refund" },
    { ptn: T_RTN, thg: "return" }, { ptn: T_SMT, thg: "statement" }, { ptn: T_SCN, thg: "subscription" }, { ptn: T_SBM, thg: "submission" },
    { ptn: T_TNS, thg: "transaction" }
  ];
  let aX, tX, aM, sjH = null;
  const aChk = SBJ_A.find(a => a.ptn.test(subj));
  if (aChk) {
    aM = aChk.ptn.exec(subj); aX = aChk.act;
    if (dev) {
      console.log(`📧 SUBJECT ACTION MATCH: 📧${lBl}MATCH: ${aM}${lBl}ACTION: ${aX}`);
    }
  }
  const tChk = SBJ_T.find(t => t.ptn.test(subj));
  if (tChk) {
    const tM = tChk.ptn.exec(subj); tX = tChk.thg;
    if (stl) { tX = `settlement`; };
    if (dev) {
      console.log(`📧 SUBJECT THING MATCH: 📧${lBl}MATCH: ${tM}${lBl}THING: ${tX}`);
    }
  }
  if (aX && tX) {
    if (aX === "applied" || aX === "complete") {
      const aPls = new RegExp(`please\\s${escRx(aM[0])}`, `i`);
      const plsM = aPls.test(subj);
      if (dev) { console.log(`📧 PLEASE MATCH? ${plsM}`); };
      if (plsM) { sjH = null; };
    } else {
      sjH = `TOPIC: ${tX}\nSTATUS: ${aX}`;
    }
    if (dev) { console.log(`📧 SUBJECT HINT:\n${sjH}`) };
    if (dbg) { console.log(`🆗 COMPLETED: subjHt 🆗`); };
  }
  return { sjH, stl };
}

// WORKFLOW FUNCTIONS //

function getMg(e) {
  if (!e || !e.gmail || !e.gmail.accessToken) { throw new Error("⛔ MISSING GMAIL ACCESS TOKEN."); };
  GmailApp.setCurrentMessageAccessToken(e.gmail.accessToken);
  const mgId = e.gmail.messageId; if (!mgId) { return null; };
  const msg = GmailApp.getMessageById(mgId);
  const date = msg.getDate() ? Utilities.formatDate(msg.getDate(), Session.getScriptTimeZone(), "M/d/yyyy h:mm a") : "";
  const subj = String(msg.getSubject() || "").replace(CL_SJ, "").trim();
  const sdr = clSdr(dMg(msg.getFrom() || "unknown"));
  const data = { mgId, date, subj, sdr };
  const { sjH, stl } = subjHt(subj);
  if (sjH !== null) {
    if (dev) { console.log(`📧 SUBJECT HINT:\n${sjH}`); };
    return { ...data, sjH: sjH };
  }
   const rawCn = msg.getBody() || "";
  let sz = szF(rawCn, 1024000, "RAW"), f;
  if (sz || btF(msg.getRawContent().substring(10000, 20000))) {
    f = sz ? fSz : fBt; return { ...data, f };
  }
  const rawH = dMg(rawCn), rawP = dMg(msg.getPlainBody()) || "";
  if (M_SCH.test(rawH)) { if (dev) { console.log(fHscm); }; return { ...data, f: fScm }; };
  const hWc = cWds(rawH), pWc = cWds(rawP);
  if (hWc < 5 && pWc < 5) { return { ...date, f: fNC }; };
  let clH, clP, clL = "HTML";
  ({ out: clH, cMs, cWs, isTh } = clHCn(rawH, clL));
  clH = clH.replace(CL_DTY, "");
  const mpH = CL_DTY.test(rawP) ? true : false;
  clL = "Plain Text"; ({ out, isTp } = clPCn(rawP, clL));
  clP = !mpH ? out : clH;
  const isT = (isTh || isTp) ? true : false;
  ({ h, p, f: f } = cnF(clH, clP, mpH, isT));
  if (!h && !p) { return { ...data, f: f }; };
  if (h && p && dcScm(clH, clP)) {
    if (dev) { console.log(lScm); }; return { ...data, f: fScm };
  }
  const useH = h && !p ? true : false;
  if (useH && dev) { console.log(lNoP); };
  let preMg = useH ? clH : clP;
  preMg = preMg.replace(P_EJ, "");
  wdC = cWds(preMg);
  if (dev) { ckLg("📝 PRECLEAN CONTENT", preMg); };
  if (wcF(wdC)) { if (dev) { console.log(`${lWc} (PRECLEAN) 🛑`); }; return { ...data, f: fWc }; };
  let mgCn = clHrFr(preMg, stl); wdC = cUqWds(mgCn);
  if (dev) {
    console.log(`📐 ☙UNIQUE❧ WORD COUNT: ${wdC}`);
    ckLg(`📝 POSTCLEAN CONTENT`, mgCn);
  }
  if (wcF(wdC)) { if (dev) { console.log(`${lWc} (FINAL) 🛑`); }; return { ...data, f: fWc }; };
  sz = szF(mgCn, 512000, "FINAL");
  if (dbg) { console.log(`🆗 COMPLETED: getMg 🆗`); };
  return { ...data, mgCn: mgCn, wdC: wdC, sjH: sjH };
}

function usrPmpt(mgCn, subj, sdr, aHnt, wcHnt) {
  return [`
    SUBJECT: ${subj}
    SENDER: ${sdr}
    `+ (aHnt ? `APPOINTMENT HINT: While summarizing, keep in mind the content is regarding an appointment with this status: ${aHnt}.` : ``) +`

    CONTENT:
    ${mgCn}

    INSTRUCTIONS:

    Your voice is the voice of the content. Adopt the STYLE, TONE, POINT-OF-VIEW, and TENSE of the content, and summarize it clearly and concisely in`  + (wcHnt ? `one straightforward, complete sentence of at least 5 words and *NO MORE THAN 20 WORDS MAXIMUM*.` : `2-4 complete sentences, each at least 3 words and *NO MORE THAN 15 WORDS MAXIMUM*. Your entire summary should be no more than 60 words. Your primary task is to provide a brief, high-level overview, NOT include all details.`) + `
    
    **NEVER refer to the content as if you exist outside of it.**
    NEVER refer to the "post/content/article/message/story/newsletter/etc." You're NOT a separate entity creating, sending, offering, or describing the content; You ARE the content. You exist INSIDE the content. There's no world outside of the content.

    **NEVER refer the recipient or sender by name!**

    Make only ONE point with your summary—the most important point. Write clearly and naturally in the *ACTIVE VOICE*, as if you're conversing with someone. *NEVER* sacrifice naturalness or active voice to avoid exdeeding the maximum word count; omit details instead. *NEVER* leave out conjunctions, definite articles, or pronouns to shorten the summary. ALWAYS prioritize naturalness and clarity, NOT thoroughness.

    DON'T use formal/academic language, jargon, or slang not used in the content. When in doubt, use exact wording.

    **NEVER preface your summary with a preamble to satisfy the active voice requirement!**
    DON'T DO THIS: "I explain..."  "I outline..." "I recommend..." "we offer..." "we highlight..." "we share..." If you're thinking of using a preamble, STOP. Instead, look at the first sentences in the paragraph in the content and use them as guides to write your sentence.
    
    Provide context for anything you reference in your summary. Anyone should be able to read the summary and understand it without reading the content. Be specific. Instead of "the conference," "the study," "the initiative," use: "the Write the Docs Conference," "the GLP-1 study," "the employee engagement iniative..."

    The content is your ONLY source of truth. *NEVER* fabricate, exaggerate, or elaborate ANY information. ONLY summarize what's actually in the content. When in doubt, LEAVE IT OUT.
    
    EXAMPLES:

    ❌ WRONG: "We offer a remote writer job...", "We seek a writer for a remote job..."
    ✅ RIGHT: "We are hiring for a remote writer job...", "We are looking for a writer for a remote job..."

    ❌ WRONG: "We highlight the latest news...", "We shared the latest research..."
    ✅ RIGHT: Just say what the latest news/research is.

    ❌ WRONG: "We recommend focused, concise alt text."
    ✅ RIGHT: Re-write to add context: ` + (wcHnt ? `"Writing alt text can be difficult, which is why we recommend keeping it focused and concise."` : `"Alt text can be difficult to write well. We recommend keeping it focused and concise."`)].join('\n');
}

function sbjPmpt(subj, sdr, sjH) {
  return [`
    MESSAGE SUBJECT: ${subj}
    SENDER: ${sdr}
    ${sjH}

    INSTRUCTIONS:
    Using the TOPIC and STATUS below, define the MESSAGE SUBJECT in one short, simple, plain language SENTENCE of no more than 10 words TOTAL. Write in the *ACTIVE VOICE* and the *SAME TENSE* (past/present/future) as the MESSAGE SUBJECT. Use correct grammar/spelling and ensure the SENTENCE is *NATURAL,* *CLEAR*, *READABLE*, and *MAKES SENSE.* Do not just copy the TOPIC and STATUS verbatim. Re-word, re-arrange, or substitute other woreds as needed to create a coherent, *NATURAL* SENTENCE that reads the way a real person would say it.

    **Use ONLY the MESSAGE SUBJECT, TOPIC, and STATUS to compose the SENTENCE. *DO NOT* embellish, guess, assume, or fabricate any additional information.**

    The SENDER is the subject of the SENTENCE; the TOPIC is the object; the STATUS is the verb. Refer to the recipient in the second person ("you/your/you're). Refer to the SENDER in the third person using the company name or individual's name. **NEVER refer the recipient by name!** If the SENDER is an email address without a name, use the MESSAGE SUBJECT and/or email domain to find the SENDER name. *DO NOT REFER TO THE SENDER USING THE EMAIL ADDRESS.* Extract the name from the email address and format it as a name with spaces and capital letters. EXAMPLE: 'ProgressiveHomeAdvantage.OLS@homesite.com' = 'Progressive Home Advantage'

    ONLY include the SENDER (if available), TOPIC, and STATUS in your SENTENCE. If the MESSAGE SUBJECT refers to a third party, use the name of the third party in your SENTENCE where appropiate. See the example below. *DO NOT include ANY other information in your SENTENCE.* The goal is to keep the SENTENCE as simple and short as possible.

    THIRD PARTY EXAMPLE:
    - SENDER = 'Braintrust'
    - MESSAGE SUBJECT = 'We sent your application to Tokola.'
    - SENTENCE = 'Braintrust has sent your application to Tokola.'

    EXAMPLE SENTENCES:
    ***IMPORTANT:*** Model your SENTENCE after these examples as closely as possible.
    - 'Your package from Chewy is on the way.'
    - 'Your order from Amazon has shipped.'
    - 'You have a new prescription at CVS Pharmacy.'
    - 'Braintrust has received your applicaiton.'
    - 'Here's your verification code from Tilt.'
    - 'Here is your receipt from Apple.'
    - 'Your order from Chewy has shipped.'
    - 'Your appointment with Dr. Quinn has been cancelled.'
    - 'Aspire has received your payment.'
    - 'Your scheduled payment to Verizon will be sent soon.'
    - 'Your monthly Affirm payment is due soon.'
  `].join('\n');
}

function opnAiCl({ system = null, user, jsonSchema = null, model = "gpt-4.1-mini" }) {
  const MX_RTY = 3;
  if (!__OPNAI_KEY) {
    __OPNAI_KEY = PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");
    if (!__OPNAI_KEY) throw new Error(`Missing API key`);
  }
  var url = "https://api.openai.com/v1/responses";
  for (let atp = 0; atp < MX_RTY; atp++) {
    try {
      var body = {
        model: model, input: [
          system ? { role: "system", content: system } : null,
          { role: "user", content: user }
        ].filter(Boolean)
      }
      if (jsonSchema) {
        body.text = {
          format: {
            type: "json_schema",
            name: "extracted_payload",
            schema: jsonSchema,
            strict: true
          }
        }
      } else { }
      var __t = Date.now();
      var res = UrlFetchApp.fetch(url, {
        method: "post",
        headers: { "Authorization": "Bearer " + __OPNAI_KEY, "Content-Type": "application/json" },
        payload: JSON.stringify(body),
        muteHttpExceptions: true
      });
      var txt = res.getContentText(), data;
      try { data = JSON.parse(txt); } catch (e) {
        throw new Error(`⛔ OPENAI RESPONSE WAS NOT JSON (${res.getResponseCode()}): ${txt}`);
      }
      var out = "", jsn = null;
      if (data && Array.isArray(data.output)) {
        for (var i = 0; i < data.output.length; i++) {
          var msg = data.output[i];
          if (!msg || !Array.isArray(msg.content)) { continue; };
          for (var j = 0; j < msg.content.length; j++) {
            var c = msg.content[j];
            if (c?.type === "output_text") {
              if (typeof c.text === "string") { out += c.text; };
              if (c.parsed !== undefined && c.parsed !== null) { jsn = c.parsed; };
            }
          }
        }
      }
      if (jsonSchema && jsn == null && out) {
        var candidate = out.trim().replace(M_JSN, "").replace(CL_JSN, "").trim();
        try { jsn = JSON.parse(candidate); } catch (_e) {}
      }
      if (dbg) { console.log(`🆗 COMPLETED: opnAiCl 🆗`); };
      if (jsonSchema) {
        if (jsn == null) { throw new Error(errOpAi); };
        return { ok: true, json: jsn, raw: data };
      } else {
        if (!out.trim()) { throw new Error(errOpAi); };
        return { ok: true, text: out.trim(), raw: data };
      }
    } catch(e) {
      console.log(`⚠️ EXCEPTION ON ATTEMPT ${atp + 1}: ${e.message}`);
      if (atp === MX_RTY - 1) { throw e; };
    }
  }
  const delay = 500 * Math.pow(2, atp) + Math.random() * 1000;
  if (dev) { console.log(`⚠️ WAITING FOR ${delay / 1000} SECONDS BEFORE NEXT ATTEMPT...`); };
  Utilities.sleep(delay);
}

function sumz(mgCn, subj, sdr, wdC, sjH) {
  let aHnt;
  const apptA = APT_A.exec(subj), apptT = APT_T.exec(subj);
  if (apptA && apptT) {
    aHnt = `APPOINTMENT: ${apptT}\nSTATUS: ${apptA}`
    if (dev) { console.log(`📆 APPTOINTMENT HINT: ${aHnt}`); };
  }
  const wcHnt = wdC <= 250;
  if (wcHnt && dev) {
    console.log(`🛑 FILTER: WORD COUNT (${wdC}) - ONE-SENTENCE SUMMARY 🛑`)
  }
  const uPmt = usrPmpt(mgCn, subj, sdr, aHnt, wcHnt),
  sPmt = sbjPmpt(subj, sdr, sjH); let res;
  if (sjH) {
    res = opnAiCl({
      system: "You are a message subject definer. Your role is to return one brief sentence that defines the subject of a message using an extracted topic and status.",
      user: sPmt
    });
  } else  {
    res = opnAiCl({
      system: "You are this content. You exist only inside the content, and you speak with the voice of the content. Your task is to summarize the text in your own voice. with a focus on your main point or goal. ***IMPORTANT: NEVER REFER YO THE CONTENT AS IF YOU EXIST OUTSIDE OF IT. YOU ARE THE CONTENT.",
      user: uPmt
    });
  }
  if (!(res && res.ok && res.text)) { return '⚠️ COULD NOT GENERATE SUMMARY.'; };
  if (dbg) { console.log(`🆗 COMPLETED: sumz 🆗`); };
  return res.text;
}

function onHomepage(e) {
  const card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("summE"))
    .addSection(CardService.newCardSection().addWidget(CardService.newTextParagraph()
    .setText(`${rsbry}<b>Hi! I'm summE.</b><br />I summarize emails in one paragraph or less. Open any message to start.${cFnt}`)));
  return card.build();
}

function onGmailMessageOpen(e) {
  try {
    var mDta = getMg(e); if (!mDta) { return onHomepage(e); };
    if (mDta.f) { return bCrd(mDta.f, mDta.subj, mDta.sdr, mDta.date, mDta.mgId, null, true); };
    let smy = clSmy(sumz(mDta.mgCn, mDta.subj, mDta.sdr, mDta.wdC, mDta.sjH));
    smy = smy.replace(P_LB, " ");
    if (dbg) { console.log(`🆗 COMPLETED: onGmailMessageOpen 🆗`); };
    return bCrd(smy, mDta.subj, mDta.sdr, mDta.date, mDta.mgId, null, false);
  } catch (err) { return bECrd(err); }
}

function bCrd(smy, subj, sdr, date, mid, tid, mFm) {
  const header = CardService.newCardHeader().setTitle(`${rsbry}summE - Gmail™ Summarizer${cFnt}`).setSubtitle('Developed by Teddy Did It Development 🐻');
  const sectionMeta = CardService.newCardSection()
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Subject:${cFnt}`).setContent(subj).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}From:${cFnt}`).setContent(sdr).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Date:${cFnt}`).setContent(date));
  const sectionSummary = CardService.newCardSection().setHeader(`${rsbry}Email Summary`).addWidget(CardService.newTextParagraph().setText(`${blkbry}${smy}`));
  if (!mFm) { sectionSummary.addWidget(CardService.newTextParagraph().setText(`${rsbry}&ndash; Generated by ChatGPT${cFnt} 🤖`)); }
  const builder = CardService.newCardBuilder().setHeader(header).addSection(sectionMeta).addSection(sectionSummary);
  if (dbg) { console.log(`🆗 COMPLETED: bCrd 🆗`); };
  if (dbg || dev) { console.log(`🎉 SUCCESS! 🎉`); };
  return builder.build();
}

function bECrd(err) {
  const eMg = (err && err.message ? err.message : String(err));
  const card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("summE")).addSection(CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText(`${stwbry}<em><b>Sorry!</b></em> That didn't work. 😕<br />${eMg}${cFnt}`)));
  return card.build();
}