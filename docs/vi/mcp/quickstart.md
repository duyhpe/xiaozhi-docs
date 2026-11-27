---
id: mcp-quickstart
title: 'Bắt đầu nhanh với MCP: kết nối công cụ máy tính'
description: 'Cài đặt, khám phá và gọi một công cụ cộng số cục bộ có thể kiểm chứng thông qua trợ lý của bạn.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Ví dụ đã vượt qua các bài kiểm thử giao thức MCP cục bộ và cầu nối WebSocket; điểm cuối thực tế, khả năng khám phá trên Console và lượt gọi bằng giọng nói trên thiết bị vẫn cần kiểm chứng bằng tài khoản của chính bạn.
translation:
  status: review
  sourceHash: ddbb2753d70b63db0f2ed268e646907670a288405d10ee7599aa712a072bc902
  reviewedAt: '2026-11-15'
---
# Bắt đầu nhanh với MCP: kết nối công cụ máy tính

Cung cấp một công cụ cộng số chạy cục bộ cho trợ lý XiaoZhi của bạn. Hãy kiểm chứng tuần tự các bước: khởi chạy → kết nối → khám phá công cụ → gọi hàm trước khi mở rộng sang xử lý tệp, tìm kiếm hay điều khiển nhà thông minh.

<a name="scope"></a>

## Chuẩn bị {#scope}

- Một thiết bị giao tiếp giọng nói XiaoZhi đang hoạt động bình thường và tài khoản Console sở hữu thiết bị đó.
- Một máy tính có thể duy trì chạy Python; hướng dẫn này sử dụng Python 3.12 và Git.
- Kết nối mạng thông suốt tới GitHub, kho gói phụ thuộc Python và điểm cuối MCP (MCP endpoint) của XiaoZhi.

Công cụ này chạy trên máy tính của bạn; **nó không được nạp vào firmware của ESP32**. Công cụ sẽ ngừng hoạt động khi bạn tắt máy tính hoặc dừng tiến trình cầu nối (bridge). Sau giai đoạn phát triển, bạn có thể chuyển nó sang một dịch vụ chạy liên tục 24/7 nếu cần.

<figure class="source-figure">

[![Các giai đoạn trong một lượt gọi công cụ cộng số.](../../public/images/en/mcp-calculator-flow.svg)](../../public/images/en/mcp-calculator-flow.svg)

<figcaption>Các giai đoạn trong một lượt gọi công cụ cộng số. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="endpoint"></a>

## 1. Lấy địa chỉ điểm cuối (Endpoint) của trợ lý {#endpoint}

1. Đăng nhập vào [XiaoZhi Console](https://xiaozhi.me/console/) và tìm trợ lý (agent) mà thiết bị đang sử dụng.
2. Mở phần cấu hình của trợ lý, vào mục **tính năng mở rộng (extension capabilities)** và mở rộng phần **điểm cuối MCP (MCP endpoint)**.
3. Sao chép địa chỉ WebSocket của trợ lý và chỉ sử dụng trong môi trường dòng lệnh (terminal) cá nhân của bạn.

Địa chỉ điểm cuối này là thông tin xác thực bí mật. Tuyệt đối không để lộ địa chỉ này trong ảnh chụp màn hình hướng dẫn, kho lưu trữ Git hay nhật ký công khai. Việc mở lại mục này trên giao diện web có thể tạo ra một địa chỉ mới nhưng không đảm bảo địa chỉ cũ đã bị vô hiệu hóa. Nếu lỡ làm lộ, hãy thực hiện quy trình quản lý thông tin xác thực hoặc liên hệ hỗ trợ hiện hành của dịch vụ.

<a name="install"></a>


## 2. Tạo một môi trường Python riêng biệt {#install}

Sử dụng mã commit cố định sau của [ví dụ cầu nối chính thức](https://github.com/78/mcp-calculator) để tái tạo lại hướng dẫn này:

```sh
git clone https://github.com/78/mcp-calculator.git
cd mcp-calculator
git checkout c537f71d61fd73b47d6c8955b5df6d3721acf4e4
```

Tạo và kích hoạt môi trường ảo. Nếu lệnh gọi Python trên máy bạn khác, hãy sử dụng lệnh trỏ đúng tới phiên bản Python 3.12:

::: code-group

```powershell [Windows PowerShell]
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

```sh [macOS / Linux]
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
```

:::

Nếu chính sách bảo mật của PowerShell chặn việc kích hoạt môi trường ảo, bạn có thể dùng trực tiếp `.\.venv\Scripts\python.exe` thay cho các lệnh `python` ở bước sau mà không cần thay đổi chính sách toàn cục của hệ thống. Nếu quá trình cài đặt thư viện phụ thuộc gặp lỗi, hãy kiểm tra lại trình thông dịch (interpreter) và thông báo lỗi đầu tiên. Phiên bản Python tối thiểu đời cũ ghi trong tệp README gốc không đảm bảo tương thích với mọi thư viện phụ thuộc hiện tại.

<a name="tool"></a>

## 3. Tạo một công cụ tối giản {#tool}

Tạo tệp **`safe_calculator.py`** nằm ngay bên cạnh tệp `mcp_pipe.py` với toàn bộ đoạn mã sau:


```python
import logging
from mcp.server.fastmcp import FastMCP

logging.basicConfig(level=logging.INFO)  # Logs go to stderr by default.
mcp = FastMCP("XiaoZhiSafeCalculator")

@mcp.tool()
def add_numbers(a: int, b: int) -> dict:
    """Add two integers exactly. Each input must be between -1000000 and 1000000."""
    if not (-1_000_000 <= a <= 1_000_000 and -1_000_000 <= b <= 1_000_000):
        raise ValueError("Each input must be between -1000000 and 1000000")
    return {"sum": a + b}

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

Công cụ này chỉ thực hiện phép cộng hai số nguyên; nó không thực thi các biểu thức Python do mô hình gửi về. Hãy dành luồng đầu ra chuẩn (`stdout`) riêng cho dữ liệu giao thức MCP và tuyệt đối không dùng hàm `print()` để gỡ lỗi.

<a name="connect"></a>

## 4. Thiết lập điểm cuối (Endpoint) và khởi chạy cầu nối {#connect}

Thay thế chuỗi giữ chỗ bằng địa chỉ điểm cuối thực tế của bạn. **Không chạy câu lệnh khi chưa thay thế chuỗi giữ chỗ.**

::: code-group

```powershell [Windows PowerShell]
\$env:MCP_ENDPOINT = 'PASTE_YOUR_COMPLETE_ENDPOINT_HERE'
python mcp_pipe.py safe_calculator.py
```

```sh [macOS / Linux]
export MCP_ENDPOINT='PASTE_YOUR_COMPLETE_ENDPOINT_HERE'
python mcp_pipe.py safe_calculator.py
```

:::

Giữ cho cửa sổ dòng lệnh (terminal) luôn chạy. Nhật ký sẽ hiển thị trạng thái kết nối WebSocket thành công và sau đó khởi chạy `safe_calculator.py`. Quá trình khám phá công cụ sẽ tạo ra một yêu cầu lấy danh sách công cụ (tool-list request). Chỉ riêng việc tiến trình khởi chạy thành công chưa đủ khẳng định trợ lý đã nhận diện được công cụ.

Nhấn `Ctrl+C` để dừng tiến trình. Nếu mở một cửa sổ terminal mới, bạn cần kích hoạt lại môi trường ảo và thiết lập lại biến môi trường điểm cuối. Hãy cấu hình riêng các biến này nếu bạn triển khai tiến trình lên máy chủ chạy ngầm.

<a name="verify"></a>

## 5. Kiểm chứng khả năng khám phá và gọi công cụ {#verify}

1. Quay lại mục điểm cuối MCP của đúng trợ lý đó trên Console và làm mới trạng thái kết nối cùng danh sách công cụ.
2. Xác nhận công cụ **`add_numbers`** đã xuất hiện. Nếu chưa thấy, hãy kiểm tra theo bảng khắc phục sự cố bên dưới trước khi thay đổi câu lệnh (prompt) trò chuyện.
3. Nói với thiết bị: “Hãy dùng công cụ cộng số để tính 37 cộng 58.”
4. Kiểm tra các tham số truyền vào là `37` và `58`, kết quả trả về từ công cụ là `sum: 95`, và câu trả lời của trợ lý khớp với kết quả đó. Hãy kiểm tra lịch sử trò chuyện trên Console cùng nhật ký chạy cục bộ trên máy tính để xác nhận công cụ thực sự đã được gọi.

::: tip Tiêu chí hoàn thành
Tiến trình cầu nối duy trì kết nối trực tuyến ổn định, trang Console khám phá được `add_numbers`, và một cuộc trò chuyện thực tế gọi thành công công cụ này để trả về kết quả `95`. Việc mô hình AI tự tính nhẩm ra `95` mà không gọi công cụ không được tính là tích hợp thành công.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Kiểm tra theo trình tự sau |
| --- | --- |
| Lỗi `ModuleNotFoundError` | Đảm bảo lệnh `python` đang chạy từ môi trường ảo `.venv` và các gói trong `requirements.txt` đã được cài đặt vào đúng môi trường này |
| Thiếu biến `MCP_ENDPOINT` | Đảm bảo biến này đã được thiết lập trong chính cửa sổ terminal đang khởi chạy tiến trình, không phải một cửa sổ khác |
| Lỗi kết nối hoặc xác thực WebSocket | Kiểm tra tính đầy đủ của địa chỉ điểm cuối, chọn đúng trợ lý, đường truyền mạng và thời hạn hiệu lực của địa chỉ; nhớ ẩn địa chỉ điểm cuối trước khi chia sẻ nhật ký |
| Đã kết nối nhưng không hiện công cụ | Kiểm tra lỗi của tiến trình con, tên tệp/đường dẫn kịch bản, hoặc lỗi vô tình ghi log ra `stdout`; làm mới lại danh sách công cụ trên Console |
| Công cụ hiển thị nhưng không được gọi | Hãy đưa ra yêu cầu rõ ràng với đúng trợ lý đó; kiểm tra lại phần mô tả công cụ, tham số đầu vào và nhật ký gọi công cụ trong lịch sử trò chuyện |
| Bị ngắt kết nối sau một thời gian | Kiểm tra xem máy tính có rơi vào chế độ ngủ (sleep), tiến trình bị thoát hoặc mạng bị gián đoạn không; không chỉ dựa vào nhật ký lúc mới kết nối |
| Dữ liệu đầu vào nằm ngoài phạm vi | Ví dụ này cố tình từ chối các số nằm ngoài giới hạn; hãy thử nghiệm với các số nguyên nằm trong khoảng quy định |

Các giới hạn về số lượng công cụ, dung lượng tin nhắn và kết nối phụ thuộc vào quy định dịch vụ hiện hành.

<a name="next"></a>

## Các bước tiếp theo {#next}

Hãy đặt cho mỗi công cụ mới một tên gọi rõ ràng, định nghĩa chặt chẽ kiểu tham số, mục đích sử dụng và các thông báo lỗi trả về. Đối với các công cụ có tác động thay đổi trạng thái hệ thống (side effects), hãy xác định rõ phạm vi quyền hạn và cơ chế xác thực trước tiên. Bạn có thể phát triển các công cụ điều khiển chân GPIO trực tiếp trên thiết bị theo [hướng dẫn MCP trên firmware](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/mcp-usage.md).

Mã nguồn cầu nối và các thư viện phụ thuộc: [mã commit gốc được sử dụng tại đây](https://github.com/78/mcp-calculator/tree/c537f71d61fd73b47d6c8955b5df6d3721acf4e4).
