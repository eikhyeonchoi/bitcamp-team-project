
package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.service.ManufacturerService;

@RestController("json/ManufacturerController")
@RequestMapping("/json/manufacturer")
public class ManufacturerController {

  @Autowired ManufacturerService manufacturerService;

  @PostMapping("add")
  public Object add(Manufacturer manufacturer) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      manufacturerService.add(manufacturer);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());

    }
    return content;

  }

  @GetMapping("delete")
  public Object delete(int no) throws Exception {

    HashMap<String,Object> map = new HashMap<>();
    try {
      if (manufacturerService.delete(no) == 0)
        throw new RuntimeException("해당 번호의 제조사가 없습니다.");
      map.put("status", "success");
    } catch (Exception e) {
      map.put("status", "fail");
      map.put("message", e.getMessage());
    }
    return map;
  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Manufacturer manufacturer = manufacturerService.get(no);
    return manufacturer;
  }

  @GetMapping("list")
  public Object list() throws Exception {

    HashMap<String,Object> map = new HashMap<>();
    List<Manufacturer> manufacturers = manufacturerService.list(null);
    map.put("list", manufacturers);

    return map;
  }

  @PostMapping("update")
  public Object update(Manufacturer manufacturer) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {

      if (manufacturerService.update(manufacturer) == 0) 
        throw new Exception("해당 번호의 수업이 없습니다.");

      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("search")
  public Object search(String keyword) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    List<Manufacturer> manufacturers = manufacturerService.list(keyword);
    content.put("manufacturers", manufacturers);
    return content;
  }
}


