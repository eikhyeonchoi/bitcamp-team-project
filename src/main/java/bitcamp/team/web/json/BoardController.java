package bitcamp.team.web.json;

import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Board;
import bitcamp.team.domain.Faq;
import bitcamp.team.service.BoardService;

@RestController("json/BoardController")
@RequestMapping("/json/board")
public class BoardController {

  BoardService boardService;

  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }
  
  @GetMapping("list")
  public Object list() {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", boardService.list());
    
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", boardService.get(no));
    
    return content;
  }
  
  @PostMapping("add")
  public Object add(Board board) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (board.getTitle() == "")
        throw new Exception("필수 입력 사항을 입력하지 않았습니다");

      boardService.add(board);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add

  @PostMapping("update")
  public Object update(Board board) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (boardService.update(board) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      
      
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // update
  
  
  
}