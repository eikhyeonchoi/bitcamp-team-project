package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;

public interface ManualService {
  int add(Manual manual);
  Manual get(int no);
  Manual getFile(int no);
  List<ManualFile> typeFileList(int no);
  List<Manual> list(String keyword, String searchType);
}
