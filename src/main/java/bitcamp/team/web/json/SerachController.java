package bitcamp.team.web.json;


import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.Review;
import bitcamp.team.domain.Tip;
import bitcamp.team.service.ManualService;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.ReviewService;
import bitcamp.team.service.TipService;

@RestController("json/SerachController")
@RequestMapping("/json/search")
public class SerachController {

  @Autowired
  ProductService productService;
  @Autowired
  ManualService manualService;
  @Autowired
  ReviewService reviewService;
  @Autowired
  TipService tipService;

  @GetMapping("list")
  public Object list(@RequestParam("keyword") String keyword) {

    HashMap<String, Object> contents = new HashMap<>();

    List<Manual> manuList = manualService.list(keyword, "search");
    List<Product> prodList = productService.list2(0, 0, keyword, "search");
    List<Review> revList = reviewService.get(0, keyword, "search");
    List<Tip> tipList = tipService.list(keyword);

    contents.put("manuList", manuList);
    contents.put("prodList", prodList);
    contents.put("revList", revList);
    contents.put("tipList", tipList);

    return contents;
  }
}
