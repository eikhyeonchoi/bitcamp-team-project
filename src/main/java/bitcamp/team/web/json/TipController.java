package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.Tip;
import bitcamp.team.domain.TipHistory;
import bitcamp.team.service.MemberService;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.TipHistoryService;
import bitcamp.team.service.TipService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/TipController")
@RequestMapping("/json/tip")
public class TipController {

  @Autowired TipService tipService;
  @Autowired ProductService productService;
  @Autowired MemberService memberService;
  @Autowired TipHistoryService tipHistoryService;

  @GetMapping("list")
  public Object list() throws Exception {
    List<Tip> tips = tipService.list();
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", tips);

    return map;
  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Tip tip = tipService.get(no);
    return tip;
  }

  @PostMapping("update")
  public Object update(Tip tip, Member member,Product product) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Tip tips = tip;
      tips.setMemberNo(memberService.get(member.getNickName()));
      tips.setProductNo(productService.get(product.getName()));
      if(tipService.update(tips) == 0)
        throw new RuntimeException("해당 번호의 팁이 존재하지 않습니다.");

      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @PostMapping("rollback")
  public Object rollback(Tip tip, Product product, int hisNo) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Tip tips = tip;
      for (TipHistory his : tipHistoryService.get(tip.getNo())) {
        if (his.getNo() == tipHistoryService.detail(hisNo).getNo()) {
          tips.setContents(his.getContents());
          tips.setCreatedDate(his.getUpdateDate());
          tips.setMemberNo(memberService.get(his.getNickName()));
          tips.setProductNo(productService.get(product.getName()));
          break;
        } else {
          tipHistoryService.delete(his.getNo());
        }
      }
      if(tipService.update(tips) == 0)
        throw new RuntimeException("해당 번호의 팁이 존재하지 않습니다.");

      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  } 
}