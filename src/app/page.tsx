import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import http from "@/utils/http";
export default async function Home() {
  const data = {
    ascFlag: false,
    baseQueryDto: {
      componentBrandList: null,
      componentSpecificationList: null,
      inStockFlag: false,
      isStoryGoods: null,
      orderLibraryTypeList: ["base", "expand"],
      packageTypeList: null,
      componentTypeIdList: null,
      preferredComponentFlagList: null,
    },
    pageVo: {
      pageNum: 1,
      pageSize: 20,
    },
    paramDtoList: null,
    queryString: "10k",
    sortMode: null,
  };
  let res = await http.post(
    "/smtComponentOrder/componentSearchController/selectPasteComponentList",
    data
  );
  return (
    <>
      <OutlinedInput
        size="small"
        sx={{ width: 600 }}
        placeholder="多个关键词用空格隔开，例如：10k 0603 电阻"
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
      />

      <TableContainer component={Paper} sx={{ maxHeight: 1000 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>元件信息</TableCell>
              <TableCell align="center">价格（含税价）</TableCell>
              <TableCell align="center">嘉立创SMT补贴</TableCell>
              <TableCell align="center">库存（PCS）</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res.data.data.map((item) => {
              return (
                <TableRow key={item.componentCode}>
                  <TableCell sx={{ display: "flex", gap: "20px" }}>
                    <Image
                      priority={true}
                      width={120}
                      height={120}
                      alt="元器件图片"
                      src="https://alimg.szlcsc.com/upload/public/product/source/20221228/9FAC57B04CBA608011C05FA2B3C494C9.jpg"
                    />
                    <div>
                      <div>
                        <span>{item.componentName}</span>
                        <span>{item.componentType}</span>
                      </div>
                      <div>
                        <span>型号：{item.componentModel}</span>
                        <span>编号：{item.componentCode}</span>
                      </div>
                      <div>品牌：{item.componentBrand}</div>
                      <div>封装：{item.componentSpecification}</div>
                      <div>描述：{item.paramTextAll}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.priceList.map((priceItem) => {
                      return (
                        <Box
                          sx={{ display: "flex" }}
                          key={priceItem.startNumber}
                        >
                          <Box sx={{ width: "42%", textAlign: "right" }}>
                            {priceItem.startNumber}+：
                          </Box>
                          <Box>{priceItem.productPrice}</Box>
                        </Box>
                      );
                    })}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button>加入私有库存</Button>
                    <Button>我要邮寄</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
