package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Notice;
import bitcamp.team.service.NoticeService;

@RestController("json/NoticeController")
@RequestMapping("/json/notice")
public class NoticeController {
  @Autowired NoticeService noticeService;
  @Autowired ServletContext servletContext;

  @PostMapping("add")
  public Object add(Notice notice) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (notice.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (notice.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }
      noticeService.add(notice);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String, Object> content = new HashMap<>();
    try {
      if (noticeService.delete(no) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) {
    return noticeService.get(no);
  }

  @GetMapping("list")
  public Object list(String keyword, String searchType) {

    List<Notice> notice = noticeService.list(keyword, searchType);

    HashMap<String, Object> content = new HashMap<>();
    content.put("list", notice);
    content.put("keyword", keyword);
    content.put("searchType", searchType);

    return content;
  }

  @PostMapping("update")
  public Object update(Notice notice) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (noticeService.update(notice) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

}
